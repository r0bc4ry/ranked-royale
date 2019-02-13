const addMinutes = require('date-fns/add_minutes');
const CronJob = require('cron').CronJob;
const Elo = require('arpad');
const elo = new Elo(32, 1, 3000);
const isPast = require('date-fns/is_past');
const subMinutes = require('date-fns/sub_minutes');

// Redis setup
const redis = process.env.NODE_ENV === 'development' ? require('redis-mock') : require('redis');
const client = redis.createClient({
    url: process.env.REDIS_URL
});
const asyncRedis = require('async-redis');
const asyncRedisClient = asyncRedis.decorate(client);

const epicGamesController = require('../epic-games-controller');

const Match = require('../../models/match');
const Stat = require('../../models/stat');
const User = require('../../models/user');

// @formatter:off
let io;
async function init(socket) {
    io = socket;

    await epicGamesController.initPromise;

    let matches = await Match.find({hasEnded: false});
    matches.forEach(async function (match) {
        console.log(`Restarting match "${match._id}" job.`);
        await _startMatch(match);
    });
}
// @formatter:on

async function getMatches(userId) {
    // Get the matches the user has participated in
    let matches = await Match.find({users: userId}).sort({createdAt: 'descending'}).limit(5).lean().exec();

    // Get the stats for each match and if two records exist, list the user's match performance
    await Promise.all(matches.map(async function (match) {
        match.stat = await Stat.findOne({userId: userId, matchId: match._id});
    }));

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

async function putMatch(userId, serverId) {
    let match = await Match.findOne({
        serverId: serverId,
        createdAt: {"$gt": subMinutes(new Date(), 30)}
    });

    let cardinality = await asyncRedisClient.scard(serverId);

    // Check if this match has recently started
    if (match && cardinality === 0) {
        throw 'This match has already started. You must enter your server ID within 60 seconds of the countdown ending.';
    }

    // Add this user to the match's queue
    await asyncRedisClient.sadd(serverId, userId);
    await asyncRedisClient.expire(serverId, 90);
    if (io.emit) {
        io.emit(serverId, cardinality + 1);
    }

    // If match document does not exist, create it
    if (!match && cardinality === 0) {
        match = await Match.create({
            serverId: serverId,
            gameMode: 'solo',
            season: 0
        });

        // After 60 seconds, begin the match
        setTimeout(async function () {
            let members = await asyncRedisClient.smembers(match.serverId);
            await asyncRedisClient.del(match.serverId);

            // TODO Undo comment for production
            // if (users.length < 5) {
            //     return await match.remove();
            // }

            match.users = members;
            await match.save();

            await _startMatch(match);
        }, 1000 * 60);
    }

    return cardinality + 1;
}

async function _startMatch(match) {
    // Get the match's users
    let users = await User.find({'_id': match.users});
    if (!users) {
        return console.error(`Match "${match._id}" has no users.`);
    }

    console.log(`Match "${match._id}" is starting.`);

    // Update the initial stats for each user
    await Promise.all(users.map(async function (user) {
        // If the server is restarting this job, check if data is already in Redis
        if (await asyncRedisClient.hget(match.serverId, user._id.toString())) {
            return;
        }

        try {
            let stats = await epicGamesController.getStatsBR(user.epicGamesAccount.id);
            await asyncRedisClient.hset(match.serverId, user._id.toString(), JSON.stringify(stats));
            await asyncRedisClient.expire(match.serverId, 300);
        } catch (err) {
            console.error(err);
        }
    }));

    _startMatchCron(match, users);
}

/**
 * Start cron job to check user stats until the match ends.
 */
function _startMatchCron(match, users) {
    let job = new CronJob('0 */1 * * * *', async function () {
        // If this job is running too long after the match has started, remove the match and stop the job
        if (isPast(addMinutes(match.createdAt, 45))) {
            await match.remove();
            await asyncRedisClient.del(match.serverId);
            console.error(`Match "${match._id}" running too long.`);
            return job.stop();
        }

        // Get each users' current stats and compare them to the saved version
        let currentStats = {};
        let usersWithUnchangedStats = [];
        await Promise.all(users.map(async function (user) {
            try {
                currentStats[user._id] = await epicGamesController.getStatsBR(user.epicGamesAccount.id);
                let prevStats = JSON.parse(await asyncRedisClient.hget(match.serverId, user._id.toString()));

                let gameModeCurrentStats = currentStats[user._id][user.epicGamesAccount.platform][match.gameMode];
                let gameModePrevStats = prevStats[user.epicGamesAccount.platform][match.gameMode];

                if (JSON.stringify(gameModeCurrentStats) === JSON.stringify(gameModePrevStats)) {
                    usersWithUnchangedStats.push(user._id);
                }
            } catch (err) {
                console.error(err);
            }
        }));

        // If the percentage of users with unchanged stats is greater than 20%, the match is not over
        let matchHasEnded = true;
        if ((usersWithUnchangedStats.length / users.length) > 0.2) {
            matchHasEnded = false;
        }

        // Check if the match should be ended
        if (matchHasEnded) {
            // Remove users from the match with unchanged stats
            await match.update({
                $pull: {
                    users: {
                        $in: usersWithUnchangedStats
                    }
                }
            });
            await _endMatch(match, users, currentStats);
            return job.stop();
        } else {
            await Promise.all(users.map(async function (user) {
                await asyncRedisClient.hset(match.serverId, user._id.toString(), JSON.stringify(currentStats[user._id]));
                await asyncRedisClient.expire(match.serverId, 300);
            }));
        }
    });

    job.start();
}

/**
 * Determine each users' performance in the match and perform cleanup.
 */
async function _endMatch(match, users, currentStats) {
    await Promise.all(users.map(async function (user) {
        let prevStats = JSON.parse(await asyncRedisClient.hget(match.serverId, user._id.toString()));

        let statDoc = {
            userId: user._id,
            matchId: match._id
        };

        // If the user's changed stats are for anything but one match, do not record their stats
        let numMatches = currentStats[user._id][user.epicGamesAccount.platform][match.gameMode].matchesplayed - prevStats[user.epicGamesAccount.platform][match.gameMode].matchesplayed;
        if (numMatches !== 1) {
            await match.update({}, {
                $pull: {
                    users: user._id
                }
            });
            return delete currentStats[user._id];
        }

        // Calculate the user's performance
        switch (match.gameMode) {
            case 'solo':
                statDoc.kills = currentStats[user._id][user.epicGamesAccount.platform].solo.kills - prevStats[user.epicGamesAccount.platform].solo.kills;
                statDoc.placeTop25 = currentStats[user._id][user.epicGamesAccount.platform].solo.placetop25 - prevStats[user.epicGamesAccount.platform].solo.placetop25;
                statDoc.placeTop10 = currentStats[user._id][user.epicGamesAccount.platform].solo.placetop10 - prevStats[user.epicGamesAccount.platform].solo.placetop10;
                statDoc.placeTop1 = currentStats[user._id][user.epicGamesAccount.platform].solo.placetop1 - prevStats[user.epicGamesAccount.platform].solo.placetop1;
                break;
            case 'duo':
                statDoc.kills = currentStats[user._id][user.epicGamesAccount.platform].duo.kills - prevStats[user.epicGamesAccount.platform].duo.kills;
                statDoc.placeTop12 = currentStats[user._id][user.epicGamesAccount.platform].duo.placetop12 - prevStats[user.epicGamesAccount.platform].duo.placetop12;
                statDoc.placeTop5 = currentStats[user._id][user.epicGamesAccount.platform].duo.placetop5 - prevStats[user.epicGamesAccount.platform].duo.placetop5;
                statDoc.placeTop1 = currentStats[user._id][user.epicGamesAccount.platform].duo.placetop1 - prevStats[user.epicGamesAccount.platform].duo.placetop1;
                break;
            case 'squad':
                statDoc.kills = currentStats[user._id][user.epicGamesAccount.platform].squad.kills - prevStats[user.epicGamesAccount.platform].squad.kills;
                statDoc.placeTop6 = currentStats[user._id][user.epicGamesAccount.platform].squad.placetop6 - prevStats[user.epicGamesAccount.platform].squad.placetop6;
                statDoc.placeTop3 = currentStats[user._id][user.epicGamesAccount.platform].squad.placetop3 - prevStats[user.epicGamesAccount.platform].squad.placetop3;
                statDoc.placeTop1 = currentStats[user._id][user.epicGamesAccount.platform].squad.placetop1 - prevStats[user.epicGamesAccount.platform].squad.placetop1;
                break;
        }

        // Reuse currentStats object to store user's performance
        currentStats[user._id] = statDoc;
    }));

    // Perform match cleanup
    match.hasEnded = true;
    await match.save();
    await asyncRedisClient.del(match.serverId);
    console.log(`Match "${match._id}" has ended.`);

    // If there are no users left in the match, simply return
    if (Object.keys(currentStats).length === 0) {
        return;
    }

    await _calculateRatings(match, users, currentStats);
}

/**
 * Rank users' performance in the match, calculate their new Elo rating, and update their stats.
 */
async function _calculateRatings(match, users, statDocs) {
    // Make a list of all the players and sort it by performance
    let scoresArray = [];
    await Promise.all(users.map(async function (user) {
        let scoreObj = {
            userId: user._id,
            score: statDocs[user._id].kills * 1
        };
        if (statDocs[user._id].placeTop25) scoreObj.score += 4;
        if (statDocs[user._id].placeTop10) scoreObj.score += 4;
        if (statDocs[user._id].placeTop1) scoreObj.score += 4;
        scoresArray.push(scoreObj);
    }));

    scoresArray.sort(function (a, b) {
        return b.score - a.score;
    });

    // Think of each player as having played two matches: a loss vs. the player above them on the list and a win vs. the player below them
    for (const [index, scoreObj] of scoresArray.entries()) {
        let userA = users.find(function (user) {
            return user._id === scoreObj.userId;
        });

        if (index !== scoresArray.length - 1) {
            let userB = users.find(function (user) {
                return user._id === scoresArray[index + 1].userId;
            });

            let playerARating = userA.stats[match.gameMode].rating;
            let playerBRating = userB.stats[match.gameMode].rating;

            // Gets expected score for first parameter
            let oddsPlayerAWins = elo.expectedScore(playerARating, playerBRating);
            let oddsPlayerBWins = elo.expectedScore(playerBRating, playerARating);

            // Update score: 1 if won, 0.5 if draw, 0 if lost
            let updatedPlayerARating = elo.newRating(oddsPlayerAWins, userA.score === userB.score ? 0.5 : 1, playerARating);
            let updatedPlayerBRating = elo.newRating(oddsPlayerBWins, userB.score === userA.score ? 0.5 : 0, playerBRating);

            statDocs[userA._id].eloDelta = updatedPlayerARating - playerARating;
            statDocs[userB._id].eloDelta = updatedPlayerBRating - playerBRating;
        }

        if (statDocs[scoreObj.userId].eloDelta == null) {
            statDocs[scoreObj.userId].eloDelta = 0;
        }

        // Create Stat documents
        await Stat.create(statDocs[scoreObj.userId]);
    }

    await Promise.all(users.map(async function (user) {
        await user.update({
            $inc: {
                'stats.solo.rating': statDocs[user._id].eloDelta,
                'stats.solo.matchesPlayed': 1,
                'stats.solo.kills': statDocs[user._id].kills,
                'stats.solo.placeTop25': statDocs[user._id].placeTop25 ? 1 : 0,
                'stats.solo.placeTop10': statDocs[user._id].placeTop10 ? 1 : 0,
                'stats.solo.placeTop1': statDocs[user._id].placeTop1 ? 1 : 0
            },
            $set: {
                'stats.solo.updatedAt': new Date()
            }
        });
    }));
}

module.exports = {
    init: init,
    getMatches: getMatches,
    getMatch: getMatch,
    putMatch: putMatch
};
