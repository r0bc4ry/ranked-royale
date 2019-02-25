const CronJob = require('cron').CronJob;
const Elo = require('arpad');
const elo = new Elo(32, 1, 3000);
const moment = require('moment');

// Redis setup
const asyncRedis = require('async-redis');
const asyncRedisClient = asyncRedis.createClient();

const epicGamesController = require('../epic-games-controller');
const Match = require('../../models/match');
const Stat = require('../../models/stat');
const User = require('../../models/user');

(async () => {
    await epicGamesController.init;

    let matches = await Match.find({hasEnded: false});
    matches.forEach(async function (match) {
        console.log(`Restarting match "${match._id}" job.`);
        await _startMatch(match);
    });
})();

async function getMatches(userId) {
    // Get the matches the user has participated in
    let matches = await Match.find({users: userId}).sort({createdAt: 'descending'}).limit(5).lean().exec();

    // Get the stats for each match and if two records exist, list the user's match performance
    for (let match of matches) {
        match.stat = await Stat.findOne({userId: userId, matchId: match._id});
    }

    return matches;
}

async function getMatch(userId, matchId) {
    var match = await Match.findById(matchId).lean().exec();

    if (!match) {
        throw 'Match does not exist.';
    }

    match.stat = await Stat.findOne({userId: userId, matchId: matchId});

    return match;
}

async function joinMatch(epicGamesAccountId, sessionId) {
    // Check if user with Epic Games account ID exists
    let user = await User.findOne({'epicGamesAccount.id': epicGamesAccountId}).lean().exec();

    if (!user) {
        return;
    }

    // Check if match has already started and cannot be joined
    let match = await Match.findOne({
        sessionId: sessionId,
        createdAt: {
            $gt: moment().subtract(30, 'minutes').toDate()
        }
    }).lean().exec();

    if (match) {
        return;
    }

    let matchExists = await asyncRedisClient.exists(sessionId);
    if (!!matchExists === false) {
        // After a timeout, create and start the match
        setTimeout(async function () {
            let members = await asyncRedisClient.smembers(sessionId);
            if (members.length < (process.env.MIN_MATCH_USERS ? parseInt(process.env.MIN_MATCH_USERS) : 5)) {
                return;
            }

            let match = await Match.create({
                sessionId: sessionId,
                gameMode: 'solo',
                season: 0,
                users: members
            });

            await asyncRedisClient.del(sessionId);
            await _startMatch(match);
        }, 1000 * 60);
    }

    // Add this user to the match in Redis
    await asyncRedisClient.sadd(sessionId, user._id.toString());
    await asyncRedisClient.expire(sessionId, 120);

    let cardinality = await asyncRedisClient.scard(sessionId);

    // Update all users about all active matches
    const app = require('../../app');
    const io = app.get('socketio');
    io.in('solo').emit('playerJoinedMatch', {
        sessionId: sessionId,
        cardinality: cardinality
    });

    // Update users in this match that another player has joined
    let members = await asyncRedisClient.smembers(sessionId);
    for (let member of members) {
        io.emit(member, cardinality);
    }
}

async function _startMatch(match) {
    // Get the match's users
    let users = await User.find({'_id': match.users});
    if (users.length <= 0) {
        return console.error(`Match "${match._id}" has no users.`);
    }

    console.log(`Match "${match._id}" is starting.`);

    // Update the initial stats for each user
    for (let user of users) {
        // If the server is restarting this job, check if data is already in Redis
        let prevStats = await asyncRedisClient.hget(match.sessionId, user._id.toString());
        if (prevStats) {
            await asyncRedisClient.expire(match.sessionId, 300);
            return;
        }

        try {
            let currentStats = await epicGamesController.getStatsForPlayer(user.epicGamesAccount.id, user.epicGamesAccount.inputType);
            await asyncRedisClient.hset(match.sessionId, user._id.toString(), JSON.stringify(currentStats));
            await asyncRedisClient.expire(match.sessionId, 300);
        } catch (err) {
            console.error(err);
        }
    }

    _startMatchCron(match, users);
}

/**
 * Start cron job to check user stats until the match ends.
 */
function _startMatchCron(match, users) {
    let job = new CronJob('0 */1 * * * *', async function () {
        console.log(`Checking if match "${match._id}" has ended.`);

        // If this job is running too long after the match has started, remove the match and stop the job
        let hasBeenTooLong = moment().isSameOrAfter(moment(match.createdAt).add(45, 'minutes'));
        if (hasBeenTooLong) {
            console.error(`Match "${match._id}" running too long.`);
            await match.remove();
            await asyncRedisClient.del(match.sessionId);
            return job.stop();
        }

        // Get each users' current stats and compare them to the saved version
        let currentStats = {};
        let usersWithUnchangedStats = [];
        for (let user of users) {
            try {
                currentStats[user._id] = await epicGamesController.getStatsForPlayer(user.epicGamesAccount.id, user.epicGamesAccount.inputType);
            } catch (err) {
                console.log(err);
                await _removeUserFromMatch(match, user, currentStats);
                return;
            }

            let prevStats;
            try {
                prevStats = await asyncRedisClient.hget(match.sessionId, user._id.toString());
                prevStats = JSON.parse(prevStats);
            } catch (err) {
                console.log(err);
                await _removeUserFromMatch(match, user, currentStats);
                return;
            }

            let gameModeKey = `default${match.gameMode}`;
            let gameModeCurrentStats = currentStats[user._id][gameModeKey];
            let gameModePrevStats = prevStats[gameModeKey];
            if (JSON.stringify(gameModeCurrentStats) === JSON.stringify(gameModePrevStats)) {
                usersWithUnchangedStats.push(user._id);
            }
        }

        // If the percentage of users with changed stats is greater than 80%, the match is over
        let matchHasEnded = false;
        if (1 - (usersWithUnchangedStats.length / users.length) >= 0.8) {
            matchHasEnded = true;
        }

        // Check if the match should be ended
        if (matchHasEnded) {
            // Remove users from the match with unchanged stats
            if (usersWithUnchangedStats.length > 0) {
                await match.update({
                    $pull: {
                        users: {
                            $in: usersWithUnchangedStats
                        }
                    }
                });
            }
            await _endMatch(match, users, currentStats);
            job.stop();
        } else {
            for (let user of users) {
                await asyncRedisClient.hset(match.sessionId, user._id.toString(), JSON.stringify(currentStats[user._id]));
                await asyncRedisClient.expire(match.sessionId, 300);
            }
        }
    });
    job.start();
}

/**
 * Determine each users' performance in the match and perform cleanup.
 */
async function _endMatch(match, users, currentStats) {
    for (let user of users) {
        let prevStats;
        try {
            prevStats = await asyncRedisClient.hget(match.sessionId, user._id.toString());
            prevStats = JSON.parse(prevStats);
        } catch (err) {
            console.log(err);
            await _removeUserFromMatch(match, user, currentStats);
            return;
        }

        let statDoc = {
            userId: user._id,
            matchId: match._id
        };

        let gameModeKey = `default${match.gameMode}`;

        // If the user's changed stats are for anything but one match, do not record their stats
        let numMatches = currentStats[user._id][gameModeKey].matchesPlayed - prevStats[gameModeKey].matchesPlayed;
        if (numMatches !== 1) {
            console.log(`User "${user._id}" reported more than one match.`);
            console.log(JSON.stringify(currentStats[user._id][gameModeKey]));
            console.log(JSON.stringify(prevStats[gameModeKey]));
            await _removeUserFromMatch(match, user, currentStats);
            return;
        }

        // Calculate the user's performance
        statDoc.minutesPlayed = currentStats[user._id][gameModeKey].minutesPlayed - prevStats[gameModeKey].minutesPlayed;
        statDoc.kills = currentStats[user._id][gameModeKey].kills - prevStats[gameModeKey].kills;
        statDoc.playersOutLived = currentStats[user._id][gameModeKey].playersOutLived - prevStats[gameModeKey].playersOutLived;
        switch (match.gameMode) {
            case 'solo':
                statDoc.placeTop25 = !!(currentStats[user._id][gameModeKey].placeTop25 - prevStats[gameModeKey].placeTop25);
                statDoc.placeTop10 = !!(currentStats[user._id][gameModeKey].placeTop10 - prevStats[gameModeKey].placeTop10);
                statDoc.placeTop1 = !!(currentStats[user._id][gameModeKey].placeTop1 - prevStats[gameModeKey].placeTop1);
                break;
            case 'duo':
                statDoc.placeTop12 = !!(currentStats[user._id][gameModeKey].placeTop12 - prevStats[gameModeKey].placeTop12);
                statDoc.placeTop5 = !!(currentStats[user._id][gameModeKey].placeTop5 - prevStats[gameModeKey].placeTop5);
                statDoc.placeTop1 = !!(currentStats[user._id][gameModeKey].placeTop1 - prevStats[gameModeKey].placeTop1);
                break;
            case 'squad':
                statDoc.placeTop6 = !!(currentStats[user._id][gameModeKey].placeTop6 - prevStats[gameModeKey].placeTop6);
                statDoc.placeTop3 = !!(currentStats[user._id][gameModeKey].placeTop3 - prevStats[gameModeKey].placeTop3);
                statDoc.placeTop1 = !!(currentStats[user._id][gameModeKey].placeTop1 - prevStats[gameModeKey].placeTop1);
                break;
        }

        // Reuse currentStats object to store user's performance
        currentStats[user._id] = statDoc;
    }

    // Perform match cleanup
    match.hasEnded = true;
    await match.save();
    await asyncRedisClient.del(match.sessionId);
    console.log(`Match "${match._id}" has ended.`);

    // If there are no users left in the match, simply return
    if (Object.keys(currentStats).length === 0) {
        return;
    }

    await _calculateRatings(match, users, currentStats);
}

async function _removeUserFromMatch(match, user, currentStats) {
    await match.update({}, {
        $pull: {
            users: user._id
        }
    });
    delete currentStats[user._id];
}

/**
 * Rank users' performance in the match, calculate their new Elo rating, and update their stats.
 */
async function _calculateRatings(match, users, statDocs) {
    // Make a list of all the players and sort it by performance
    let scoresArray = [];
    for (let user of users) {
        let scoreObj = {
            userId: user._id,
            score: statDocs[user._id].kills * 1
        };
        if (statDocs[user._id].placeTop25) scoreObj.score += 4;
        if (statDocs[user._id].placeTop10) scoreObj.score += 4;
        if (statDocs[user._id].placeTop1) scoreObj.score += 4;
        scoresArray.push(scoreObj);
    }

    scoresArray.sort(function (a, b) {
        return b.score - a.score;
    });

    // Think of each player as having played two matches: a loss vs. the player above them on the list and a win vs. the player below them
    for (const [index, userAScoreObj] of scoresArray.entries()) {
        let userA = users.find(function (user) {
            return user._id === userAScoreObj.userId;
        });

        if (index !== scoresArray.length - 1) {
            let userBScoreObj = scoresArray[index + 1];
            let userB = users.find(function (user) {
                return user._id === userBScoreObj.userId;
            });

            let playerARating = userA.stats[match.gameMode].rating;
            let playerBRating = userB.stats[match.gameMode].rating;

            // Gets expected score for first parameter
            let oddsPlayerAWins = elo.expectedScore(playerARating, playerBRating);
            let oddsPlayerBWins = elo.expectedScore(playerBRating, playerARating);

            // Update score: 1 if won, 0.5 if draw, 0 if lost
            let updatedPlayerARating = elo.newRating(oddsPlayerAWins, userAScoreObj.score === userBScoreObj.score ? 0.5 : 1, playerARating);
            let updatedPlayerBRating = elo.newRating(oddsPlayerBWins, userBScoreObj.score === userAScoreObj.score ? 0.5 : 0, playerBRating);

            if (statDocs[userA._id].eloDelta == null) {
                statDocs[userA._id].eloDelta = 0;
            }
            statDocs[userA._id].eloDelta += updatedPlayerARating - playerARating;

            if (statDocs[userB._id].eloDelta == null) {
                statDocs[userB._id].eloDelta = 0;
            }
            statDocs[userB._id].eloDelta += updatedPlayerBRating - playerBRating;
        }

        // This is required here for single player, testing games
        if (statDocs[userA._id].eloDelta == null) {
            statDocs[userA._id].eloDelta = 0;
        }

        // Create Stat documents
        await Stat.create(statDocs[userA._id]);
    }

    for (let user of users) {
        await user.update({
            $inc: {
                'stats.solo.rating': statDocs[user._id].eloDelta,
                'stats.solo.matchesPlayed': 1,
                'stats.solo.minutesPlayed': statDocs[user._id].minutesPlayed,
                'stats.solo.kills': statDocs[user._id].kills,
                'stats.solo.playersOutLived': statDocs[user._id].playersOutLived,
                'stats.solo.placeTop25': statDocs[user._id].placeTop25 ? 1 : 0,
                'stats.solo.placeTop10': statDocs[user._id].placeTop10 ? 1 : 0,
                'stats.solo.placeTop1': statDocs[user._id].placeTop1 ? 1 : 0
            },
            $set: {
                'stats.solo.updatedAt': new Date()
            }
        });
    }
}

module.exports = {
    getMatches: getMatches,
    getMatch: getMatch,
    joinMatch: joinMatch
};
