const CronJob = require('cron').CronJob;
const Elo = require('arpad');
const elo = new Elo(32, 1, 3000);
const moment = require('moment');

// Redis setup
const asyncRedis = require('async-redis');
const asyncRedisClient = asyncRedis.createClient({url: process.env.REDIS_URL});

const epicGamesController = require('../epic-games-controller');
const Match = require('../../models/match');
const Stat = require('../../models/stat');
const User = require('../../models/user');

(async () => {
    await epicGamesController.init;

    let matches = await Match.find({hasEnded: false});
    matches.forEach(async function (match) {
        console.log(`Restarting match "${match.sessionId}" job.`);
        await _startMatch(match);
    });
})();

async function getMatches(userId) {
    // Get the matches the user has participated in
    let soloMatches = await Match.find({
        users: userId,
        gameMode: 'solo'
    }).sort({createdAt: 'descending'}).lean().exec();

    for (let match of soloMatches) {
        match.stat = await Stat.findOne({userId: userId, matchId: match._id});
    }

    let duoMatches = await Match.find({
        users: userId,
        gameMode: 'duo'
    }).sort({createdAt: 'descending'}).lean().exec();

    for (let match of duoMatches) {
        match.stat = await Stat.findOne({userId: userId, matchId: match._id});
    }

    let squadMatches = await Match.find({
        users: userId,
        gameMode: 'squad'
    }).sort({createdAt: 'descending'}).lean().exec();

    for (let match of squadMatches) {
        match.stat = await Stat.findOne({userId: userId, matchId: match._id});
    }

    return {
        solo: soloMatches,
        duo: duoMatches,
        squad: squadMatches,
    };
}

async function getMatch(userId, matchId) {
    let match = await Match.findOne({_id: matchId, users: userId}).lean().exec();
    if (!match) {
        throw 'Match does not exist for this user.';
    }

    match.stat = await Stat.findOne({userId: userId, matchId: matchId});

    return match;
}

/**
 * Use a user's incoming status updates to track their party before a match.
 */
async function joinParty(userId, partyId) {
    if (!userId || !partyId) {
        return;
    }

    // Remove user from their previous party
    let prevParty = await asyncRedisClient.get(`user:${userId}:partyId`);
    if (prevParty) {
        await asyncRedisClient.srem(`party:${prevParty}`, userId);
    }

    // Add user to their new party
    await asyncRedisClient.sadd(`party:${partyId}`, userId);
    await asyncRedisClient.expire(`party:${partyId}`, 86400); // 24 hours
    await asyncRedisClient.set(`user:${userId}:partyId`, partyId);
    await asyncRedisClient.expire(`user:${userId}:partyId`, 86400); // 24 hours
}

/**
 * Add a party to a match once it starts.
 */
async function joinMatch(userId, partyId, sessionId, numPlayers) {
    if (!userId || !partyId || !sessionId || !numPlayers) {
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

    // If first user in match, start a timeout to start the match
    let matchExists = await asyncRedisClient.exists(`match:${sessionId}:parties`);
    if (!!matchExists === false) {
        setTimeout(() => {
            _startMatchTimeout(sessionId);
        }, 1000 * 60);
    }

    // Add this party to the match in Redis
    await joinParty(userId, partyId);
    await asyncRedisClient.sadd(`match:${sessionId}:parties`, partyId);
    await asyncRedisClient.expire(`match:${sessionId}:parties`, 3600); // 1 hour

    // Use the updated status text to determine the number of starting players in the match
    let numStartingPlayers = await asyncRedisClient.get(`match:${sessionId}:numStartingPlayers`);
    if (!numStartingPlayers || numPlayers > numStartingPlayers) {
        await asyncRedisClient.set(`match:${sessionId}:numStartingPlayers`, numPlayers);
        await asyncRedisClient.expire(`match:${sessionId}:numStartingPlayers`, 120); // 2 minutes
    }

    // Update all users about all active matches
    const app = require('../../app');
    const io = app.get('socketio');

    let cardinality = await asyncRedisClient.scard(`match:${sessionId}:parties`);

    io.in('solo').emit('playerJoinedMatch', {
        sessionId: sessionId,
        cardinality: cardinality
    });

    // Update users in this match that another player has joined
    let parties = await asyncRedisClient.smembers(`match:${sessionId}:parties`);
    for (let partyId of parties) {
        let partyMembers = await asyncRedisClient.smembers(`party:${partyId}`);
        for (let userId of partyMembers) {
            io.emit(userId, {
                cardinality: cardinality
            });
        }
    }
}

async function _startMatchTimeout(sessionId) {
    console.log(`Attempting to start match "${sessionId}".`);

    let parties = await asyncRedisClient.smembers(`match:${sessionId}:parties`);

    // Determine the game mode from the max party size
    let maxPartySize = 0;
    for (let partyId of parties) {
        let numPartyMembers = await asyncRedisClient.scard(`party:${partyId}`);
        if (numPartyMembers > maxPartySize) {
            maxPartySize = numPartyMembers;
        }
    }

    let gameMode = 'solo';
    switch (maxPartySize) {
        case 2:
            gameMode = 'duo';
            break;
        case 3:
        case 4:
            gameMode = 'squad';
            break;
    }

    // Determine if enough users are in a party and if enough parties are in the match
    if (process.env.NODE_ENV === 'production') {
        switch (gameMode) {
            case 'solo':
                if (parties.length < 4) {
                    console.log(`Not enough parties for Solo match "${sessionId}" - performing cleanup.`);
                    await asyncRedisClient.del(`match:${sessionId}:numStartingPlayers`);
                    await asyncRedisClient.del(`match:${sessionId}:parties`);
                }
                break;
            case 'duo':
                for (let partyId of parties) {
                    let numPartyMembers = await asyncRedisClient.scard(`party:${partyId}`);
                    if (numPartyMembers !== 2) {
                        await asyncRedisClient.srem(`match:${sessionId}:parties`, partyId);
                    }
                }

                let numDuoParties = await asyncRedisClient.scard(`match:${sessionId}:parties`);
                if (numDuoParties < 2) {
                    console.log(`Not enough parties for Duos match "${sessionId}" - performing cleanup.`);
                    await asyncRedisClient.del(`match:${sessionId}:numStartingPlayers`);
                    await asyncRedisClient.del(`match:${sessionId}:parties`);
                    return;
                }

                break;
            case 'squad':
                for (let partyId of parties) {
                    let numPartyMembers = await asyncRedisClient.scard(`party:${partyId}`);
                    if (numPartyMembers !== 4) {
                        await asyncRedisClient.srem(`match:${sessionId}:parties`, partyId);
                    }
                }

                let numSquadParties = await asyncRedisClient.scard(`match:${sessionId}:parties`);
                if (numSquadParties < 2) {
                    console.log(`Not enough parties for Squads match "${sessionId}" - performing cleanup.`);
                    await asyncRedisClient.del(`match:${sessionId}:numStartingPlayers`);
                    await asyncRedisClient.del(`match:${sessionId}:parties`);
                    return;
                }

                break;
        }
    }

    let users = [];
    for (let partyId of parties) {
        let partyMembers = await asyncRedisClient.smembers(`party:${partyId}`);
        users = users.concat(partyMembers);
    }

    let numStartingPlayers = await asyncRedisClient.get(`match:${sessionId}:numStartingPlayers`);
    await asyncRedisClient.del(`match:${sessionId}:numStartingPlayers`);

    // Create match and perform cleanup
    let match = await Match.create({
        sessionId: sessionId,
        gameMode: gameMode,
        season: 0,
        numStartingPlayers: numStartingPlayers,
        users: users
    });

    await _startMatch(match);
}

async function _startMatch(match) {
    console.log(`Match "${match.sessionId}" is starting.`);

    // Get the match's users
    let users = await User.find({'_id': match.users});

    // Update the initial stats for each user
    for (let user of users) {
        // If the server is restarting this job, check if data is already in Redis
        let prevStats = await asyncRedisClient.hget(`match:${match.sessionId}:stats`, user._id.toString());
        if (prevStats) {
            await asyncRedisClient.expire(`match:${match.sessionId}:stats`, 3600); // 1 hour
            continue;
        }

        let currentStats = await epicGamesController.getStatsForPlayer(user.epicGamesAccount.id, user.epicGamesAccount.inputType);
        await asyncRedisClient.hset(`match:${match.sessionId}:stats`, user._id.toString(), JSON.stringify(currentStats));
        await asyncRedisClient.expire(`match:${match.sessionId}:stats`, 3600); // 1 hour
    }

    _startMatchCronJob(match);
}

/**
 * Start cron job to check user stats until the match ends.
 */
function _startMatchCronJob(match) {
    let job = new CronJob({
        cronTime: '0 */1 * * * *',
        onTick: async function () {
            console.log(`Checking if match "${match.sessionId}" has ended.`);

            // If this job is running too long after the match has started, remove the match and stop the job
            let matchRunningTooLong = moment().isSameOrAfter(moment(match.createdAt).add(45, 'minutes'));
            if (matchRunningTooLong) {
                console.error(`Match "${match.sessionId}" running too long.`);
                await match.remove();
                await asyncRedisClient.del(`match:${match.sessionId}:parties`);
                await asyncRedisClient.del(`match:${match.sessionId}:stats`);
                return job.stop();
            }

            // Get the match's users
            let users = await User.find({'_id': match.users});

            // Get each users' current stats and compare them to the saved version
            let usersCurrentStats = {};
            let usersWithUnchangedStats = [];
            await Promise.all(users.map(async (user) => {
                let userId = user._id.toString();

                let currentStats = await epicGamesController.getStatsForPlayer(user.epicGamesAccount.id, user.epicGamesAccount.inputType);

                let prevStats = await asyncRedisClient.hget(`match:${match.sessionId}:stats`, userId);
                prevStats = JSON.parse(prevStats);
                // TODO Investigate this, but sometimes prevStats will return empty, even after being successfully set in the previous run
                if (Object.keys(prevStats).length === 0) {
                    prevStats = currentStats;
                }

                let gameModeKey = `default${match.gameMode}`;
                if (JSON.stringify(currentStats[gameModeKey]) === JSON.stringify(prevStats[gameModeKey])) {
                    usersWithUnchangedStats.push(userId);
                }

                usersCurrentStats[userId] = currentStats;
            }));

            // If the percentage of users with changed stats is greater than 75%, the match is over
            if (1 - (usersWithUnchangedStats.length / users.length) >= 0.75) {
                // TODO Remove users from the match with unchanged stats?
                await _endMatch(match, users, usersCurrentStats);
                return job.stop();
            }

            await Promise.all(users.map(async (user) => {
                let userId = user._id.toString();
                await asyncRedisClient.hset(`match:${match.sessionId}:stats`, userId, JSON.stringify(usersCurrentStats[userId]));
                await asyncRedisClient.expire(`match:${match.sessionId}:stats`, 3600); // 1 hour
            }));
        },
        start: true
    });
}

/**
 * Determine each users' performance in the match and perform cleanup.
 */
async function _endMatch(match, users, usersCurrentStats) {
    await Promise.all(users.map(async (user) => {
        let userId = user._id.toString();

        let prevStats = await asyncRedisClient.hget(`match:${match.sessionId}:stats`, userId);
        prevStats = JSON.parse(prevStats);
        // TODO Investigate this, but sometimes prevStats will return empty, even after being successfully set in the previous run
        if (Object.keys(prevStats).length === 0) {
            prevStats = usersCurrentStats[userId];
        }

        let partyId = await asyncRedisClient.get(`user:${userId}:partyId`);
        let statDoc = {
            userId: userId,
            partyId: partyId,
            matchId: match._id.toString(),
            eloDelta: 0
        };

        let gameModeKey = `default${match.gameMode}`;

        // If the user's changed stats are for anything but one match, do not record their stats
        let numMatches = usersCurrentStats[userId][gameModeKey].matchesPlayed - prevStats[gameModeKey].matchesPlayed;
        if (numMatches !== 1) {
            console.log(`User "${userId}" reported ${numMatches} ${gameModeKey} matches.`);
            console.log(JSON.stringify(usersCurrentStats[userId]));
            console.log(JSON.stringify(prevStats));
            await _removeUserFromMatch(match, userId, usersCurrentStats);
            return;
        }

        // Calculate the user's performance
        statDoc.kills = usersCurrentStats[userId][gameModeKey].kills - prevStats[gameModeKey].kills;
        statDoc.minutesPlayed = usersCurrentStats[userId][gameModeKey].minutesPlayed - prevStats[gameModeKey].minutesPlayed;
        statDoc.placement = match.numStartingPlayers - (usersCurrentStats[userId][gameModeKey].playersOutLived - prevStats[gameModeKey].playersOutLived);
        switch (match.gameMode) {
            case 'solo':
                statDoc.placeTop25 = !!(usersCurrentStats[userId][gameModeKey].placeTop25 - prevStats[gameModeKey].placeTop25);
                statDoc.placeTop10 = !!(usersCurrentStats[userId][gameModeKey].placeTop10 - prevStats[gameModeKey].placeTop10);
                statDoc.placeTop1 = !!(usersCurrentStats[userId][gameModeKey].placeTop1 - prevStats[gameModeKey].placeTop1);
                break;
            case 'duo':
                statDoc.placeTop12 = !!(usersCurrentStats[userId][gameModeKey].placeTop12 - prevStats[gameModeKey].placeTop12);
                statDoc.placeTop5 = !!(usersCurrentStats[userId][gameModeKey].placeTop5 - prevStats[gameModeKey].placeTop5);
                statDoc.placeTop1 = !!(usersCurrentStats[userId][gameModeKey].placeTop1 - prevStats[gameModeKey].placeTop1);
                break;
            case 'squad':
                statDoc.placeTop6 = !!(usersCurrentStats[userId][gameModeKey].placeTop6 - prevStats[gameModeKey].placeTop6);
                statDoc.placeTop3 = !!(usersCurrentStats[userId][gameModeKey].placeTop3 - prevStats[gameModeKey].placeTop3);
                statDoc.placeTop1 = !!(usersCurrentStats[userId][gameModeKey].placeTop1 - prevStats[gameModeKey].placeTop1);
                break;
        }

        // Reuse usersCurrentStats object to store user's performance
        usersCurrentStats[userId] = statDoc;
    }));

    // If there are no users left in the match, simply return - this is for when all users are stripped from a match from an error above
    if (Object.keys(usersCurrentStats).length === 0) {
        console.log(`Match "${match.sessionId}" has ended with 0 users.`);
        await match.remove();
        await asyncRedisClient.del(`match:${match.sessionId}:parties`);
        await asyncRedisClient.del(`match:${match.sessionId}:stats`);
        return;
    }

    await _calculateRatings(match, users, usersCurrentStats);

    console.log(`Match "${match.sessionId}" has ended - performing cleanup.`);

    match.hasEnded = true;
    await match.save();
    await asyncRedisClient.del(`match:${match.sessionId}:parties`);
    await asyncRedisClient.del(`match:${match.sessionId}:stats`);
}

async function _removeUserFromMatch(match, userId, usersCurrentStats) {
    await match.update({}, {
        $pull: {
            users: userId
        }
    });
    await asyncRedisClient.hdel(`match:${match.sessionId}:stats`, userId);
    delete usersCurrentStats[userId];
}

/**
 * Rank users' performance in the match, calculate their new Elo rating, and update their stats.
 */
async function _calculateRatings(match, users, statDocs) {
    let partyScores = [];

    // Make a list of all parties and sort it by performance
    let parties = await asyncRedisClient.smembers(`match:${match.sessionId}:parties`);
    await Promise.all(parties.map(async (partyId) => {
        let partyScoreObj = {
            partyId: partyId,
            score: 0,
            users: {},
            eloAvg: 0
        };

        switch (match.gameMode) {
            case 'duo':
                partyScoreObj.placeTop12 = true;
                partyScoreObj.placeTop5 = true;
                partyScoreObj.placeTop1 = true;
                break;
            case 'squad':
                partyScoreObj.placeTop6 = true;
                partyScoreObj.placeTop3 = true;
                partyScoreObj.placeTop1 = true;
                break;
        }

        let partyMembers = await asyncRedisClient.smembers(`party:${partyId}`);
        for (let userId of partyMembers) {
            if (!statDocs[userId]) {
                continue;
            }

            let user = users.find(function (user) {
                return userId === user._id.toString();
            });

            // Determine party placement
            switch (match.gameMode) {
                case 'solo':
                    if (statDocs[userId].placeTop25) partyScoreObj.score += 2;
                    if (statDocs[userId].placeTop10) partyScoreObj.score += 2;
                    if (statDocs[userId].placement <= 5) partyScoreObj.score += 2;
                    if (statDocs[userId].placement <= 3) partyScoreObj.score += 2;
                    if (statDocs[userId].placeTop1) partyScoreObj.score += 4;
                    break;
                case 'duo':
                    partyScoreObj.placeTop12 = partyScoreObj.placeTop12 && statDocs[userId].placeTop12;
                    partyScoreObj.placeTop5 = partyScoreObj.placeTop5 && statDocs[userId].placeTop5;
                    partyScoreObj.placeTop1 = partyScoreObj.placeTop1 && statDocs[userId].placeTop1;
                    break;
                case 'squad':
                    partyScoreObj.placeTop6 = partyScoreObj.placeTop6 && statDocs[userId].placeTop6;
                    partyScoreObj.placeTop3 = partyScoreObj.placeTop3 && statDocs[userId].placeTop3;
                    partyScoreObj.placeTop1 = partyScoreObj.placeTop1 && statDocs[userId].placeTop1;
                    break;
            }

            // Add kill points for user
            let killPoints = statDocs[userId].kills * 1;
            partyScoreObj.users[userId] = killPoints;
            partyScoreObj.score += killPoints;
            partyScoreObj.eloAvg += user.stats[match.gameMode].rating;
        }

        // Add placement points for duo/squad
        switch (match.gameMode) {
            case 'duo':
                if (partyScoreObj.placeTop12) partyScoreObj.score += 4;
                if (partyScoreObj.placeTop5) partyScoreObj.score += 4;
                if (partyScoreObj.placeTop1) partyScoreObj.score += 4;
                delete partyScoreObj.placeTop12;
                delete partyScoreObj.placeTop5;
                delete partyScoreObj.placeTop1;
                break;
            case 'squad':
                if (partyScoreObj.placeTop6) partyScoreObj.score += 4;
                if (partyScoreObj.placeTop3) partyScoreObj.score += 4;
                if (partyScoreObj.placeTop1) partyScoreObj.score += 4;
                delete partyScoreObj.placeTop6;
                delete partyScoreObj.placeTop3;
                delete partyScoreObj.placeTop1;
                break;
        }

        partyScoreObj.eloAvg /= partyMembers.length;
        partyScores.push(partyScoreObj);
    }));

    partyScores.sort(function (a, b) {
        return b.score - a.score;
    });

    // Think of each player as having played two matches: a loss vs. the player above them on the list and a win vs. the player below them
    for (const [index, partyAScoreObj] of partyScores.entries()) {
        let partyAMembers = await asyncRedisClient.smembers(`party:${partyAScoreObj.partyId}`);

        if (index !== partyScores.length - 1) {
            let partyBScoreObj = partyScores[index + 1];

            let partyARating = partyAScoreObj.eloAvg;
            let partyBRating = partyBScoreObj.eloAvg;

            // Gets expected score for first parameter
            let oddsPartyAWins = elo.expectedScore(partyARating, partyBRating);
            let oddsPartyBWins = elo.expectedScore(partyBRating, partyARating);

            // Update score: 1 if won, 0.5 if draw, 0 if lost
            let updatedPartyARating = elo.newRating(oddsPartyAWins, partyAScoreObj.score === partyBScoreObj.score ? 0.5 : 1, partyARating);
            let updatedPartyBRating = elo.newRating(oddsPartyBWins, partyBScoreObj.score === partyAScoreObj.score ? 0.5 : 0, partyBRating);

            for (let userId of partyAMembers) {
                statDocs[userId].eloDelta += updatedPartyARating - partyARating;
            }

            let partyBMembers = await asyncRedisClient.smembers(`party:${partyBScoreObj.partyId}`);
            for (let userId of partyBMembers) {
                statDocs[userId].eloDelta += updatedPartyBRating - partyBRating;
            }
        }

        // Create Stat documents
        for (let userId of partyAMembers) {
            await Stat.create(statDocs[userId]);
        }
    }

    for (let user of users) {
        switch (match.gameMode) {
            case 'solo':
                await user.update({
                    $inc: {
                        'stats.solo.rating': statDocs[user._id].eloDelta,
                        'stats.solo.matchesPlayed': 1,
                        'stats.solo.minutesPlayed': statDocs[user._id].minutesPlayed,
                        'stats.solo.kills': statDocs[user._id].kills,
                        'stats.solo.placeTop25': statDocs[user._id].placeTop25 ? 1 : 0,
                        'stats.solo.placeTop10': statDocs[user._id].placeTop10 ? 1 : 0,
                        'stats.solo.placeTop1': statDocs[user._id].placeTop1 ? 1 : 0
                    },
                    $set: {
                        'stats.solo.updatedAt': new Date()
                    }
                });
                break;
            case 'duo':
                await user.update({
                    $inc: {
                        'stats.duo.rating': statDocs[user._id].eloDelta,
                        'stats.duo.matchesPlayed': 1,
                        'stats.duo.minutesPlayed': statDocs[user._id].minutesPlayed,
                        'stats.duo.kills': statDocs[user._id].kills,
                        'stats.duo.placeTop12': statDocs[user._id].placeTop12 ? 1 : 0,
                        'stats.duo.placeTop5': statDocs[user._id].placeTop5 ? 1 : 0,
                        'stats.duo.placeTop1': statDocs[user._id].placeTop1 ? 1 : 0
                    },
                    $set: {
                        'stats.duo.updatedAt': new Date()
                    }
                });
                break;
            case 'squad':
                await user.update({
                    $inc: {
                        'stats.squad.rating': statDocs[user._id].eloDelta,
                        'stats.squad.matchesPlayed': 1,
                        'stats.squad.minutesPlayed': statDocs[user._id].minutesPlayed,
                        'stats.squad.kills': statDocs[user._id].kills,
                        'stats.squad.placeTop6': statDocs[user._id].placeTop6 ? 1 : 0,
                        'stats.squad.placeTop3': statDocs[user._id].placeTop3 ? 1 : 0,
                        'stats.squad.placeTop1': statDocs[user._id].placeTop1 ? 1 : 0
                    },
                    $set: {
                        'stats.squad.updatedAt': new Date()
                    }
                });
                break;
        }
    }
}

module.exports = {
    getMatches: getMatches,
    getMatch: getMatch,
    joinMatch: joinMatch,
    joinParty: joinParty
};
