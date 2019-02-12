const CronJob = require('cron').CronJob;
const eloController = require('../elo-controller');
const epicGamesController = require('../epic-games-controller');
const addMinutes = require('date-fns/add_minutes');
const subMinutes = require('date-fns/sub_minutes');
const isPast = require('date-fns/is_past');

const redis = process.env.NODE_ENV === 'development' ? require('redis-mock') : require('redis');
const client = redis.createClient({
    url: process.env.REDIS_URL
});
const asyncRedis = require('async-redis');
const asyncRedisClient = asyncRedis.decorate(client);

const Match = require('../../models/match');
const Stat = require('../../models/stat');
const User = require('../../models/user');

(async () => {
    // TODO In the event of an error crashing the application, restart the unfinished matches
    // let unfinsishedMatches = await Match.find({hasEnded: false});
    // await Promise.all(unfinsishedMatches.map(async function (match) {
    //     await _startMatch(match);
    // }));
})();

async function getMatches(userId) {
    // Get the matches the user has participated in
    let matches = await Match.find({users: userId}).sort({createdAt: 'descending'}).limit(10).lean().exec();

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

    await asyncRedisClient.sadd(serverId, userId);
    await asyncRedisClient.expire(serverId, 120);
    global.io.emit(serverId, cardinality + 1);

    if (!match && cardinality === 0) {
        match = await Match.create({
            serverId: serverId,
            gameMode: 'solo',
            season: 0
        });

        // After timeout for users to queue in Redis, begin the match
        setTimeout(function () {
            _startMatch(match);
        }, 1000 * 60);
    }

    return cardinality + 1;
}

async function _startMatch(match) {
    if (!match.users.length) {
        let members = await asyncRedisClient.smembers(match.serverId);
        await asyncRedisClient.del(match.serverId);

        // TODO Undo comment for production
        // if (users.length < 5) {
        //     return await match.delete();
        // }

        match.users = members;
        await match.save();
    }

    let users = await User.find({'_id': match.users});
    await Promise.all(users.map(async function (user) {
        console.log(`Checking stats for ${user.epicGamesAccount.displayName} at ${new Date()}`);
        try {
            let stats = await epicGamesController.getStats(user.epicGamesAccount.id);
            await asyncRedisClient.hset(match.serverId, user._id.toString(), JSON.stringify(stats));
            await asyncRedisClient.expire(match.serverId, 1800);
        } catch (err) {
            console.error(err);
        }
    }));

    // Start cron job to get stats every minute until the match ends
    _startCronJob(match, users);
}

function _startCronJob(match, users) {
    let job = new CronJob('0 */1 * * * *', async function () {
        // If this job has been running for more than 45 minutes, stop it
        if (isPast(addMinutes(match.createdAt, 45))) {
            console.log(`Match ${match._id} was running for more than 45 minutes.`);
            await match.remove();
            await asyncRedisClient.del(match.serverId);
            return job.stop();
        }

        let currentStats = {};
        let unchangedUsers = [];
        await Promise.all(users.map(async function (user) {
            console.log(`Checking stats for ${user.epicGamesAccount.displayName} at ${new Date()}`);
            try {
                currentStats[user._id] = await epicGamesController.getStats(user.epicGamesAccount.id);
                let prevStats = await asyncRedisClient.hget(match.serverId, user._id.toString());
                prevStats = JSON.parse(prevStats);

                let gameModeCurrentStats = currentStats[user._id][user.epicGamesAccount.platform][match.gameMode];
                let gameModePrevStats = prevStats[user.epicGamesAccount.platform][match.gameMode];
                if (JSON.stringify(gameModeCurrentStats) === JSON.stringify(gameModePrevStats)) {
                    unchangedUsers.push(user._id);
                }
            } catch (err) {
                console.error(err);
            }
        }));

        // To prevent a small number of users from causing a match to last forever, check if the percentage of unchanged stats is greater than 20%
        let matchHasEnded = true;
        if (unchangedUsers.length / users.length > 0.2) {
            matchHasEnded = false;
        }

        if (matchHasEnded) {
            await Promise.all(users.map(async function (user) {
                let prevStats = await asyncRedisClient.hget(match.serverId, user._id.toString());
                prevStats = JSON.parse(prevStats);

                let statDoc = {
                    userId: user._id,
                    matchId: match._id
                };

                // Check the user's stats are only reporting for 1 match
                let numMatches = currentStats[user._id][user.epicGamesAccount.platform][match.gameMode].matchesplayed - prevStats[user.epicGamesAccount.platform][match.gameMode].matchesplayed;
                if (numMatches !== 1) {
                    console.log(`User "${user._id}" reported ${numMatches} matches instead of 1.`);
                    console.log(JSON.stringify(currentStats));
                    console.log(JSON.stringify(prevStats));
                    try {
                        await match.update({}, {
                            $pull: {
                                users: {
                                    $in: [user._id]
                                }
                            }
                        });
                    } catch (err) {
                        console.error(err);
                    }
                    return delete currentStats[user._id];
                }

                switch (match.gameMode) {
                    case 'solo':
                        statDoc.kills = currentStats[user._id][user.epicGamesAccount.platform].solo.kills === undefined ?
                            0 : currentStats[user._id][user.epicGamesAccount.platform].solo.kills - prevStats[user.epicGamesAccount.platform].solo.kills;
                        statDoc.placeTop1 = currentStats[user._id][user.epicGamesAccount.platform].solo.placetop1 === undefined ?
                            0 : currentStats[user._id][user.epicGamesAccount.platform].solo.placetop1 - prevStats[user.epicGamesAccount.platform].solo.placetop1;
                        statDoc.placeTop10 = currentStats[user._id][user.epicGamesAccount.platform].solo.placetop10 === undefined ?
                            0 : currentStats[user._id][user.epicGamesAccount.platform].solo.placetop10 - prevStats[user.epicGamesAccount.platform].solo.placetop10;
                        statDoc.placeTop25 = currentStats[user._id][user.epicGamesAccount.platform].solo.placetop25 === undefined ?
                            0 : currentStats[user._id][user.epicGamesAccount.platform].solo.placetop25 - prevStats[user.epicGamesAccount.platform].solo.placetop25;
                        break;
                    case 'duo':
                        statDoc.kills = currentStats[user._id][user.epicGamesAccount.platform].duo.kills === undefined ?
                            0 : currentStats[user._id][user.epicGamesAccount.platform].duo.kills - prevStats[user.epicGamesAccount.platform].duo.kills;
                        statDoc.placeTop1 = currentStats[user._id][user.epicGamesAccount.platform].duo.placetop1 === undefined ?
                            0 : currentStats[user._id][user.epicGamesAccount.platform].duo.placetop1 - prevStats[user.epicGamesAccount.platform].duo.placetop1;
                        statDoc.placeTop5 = currentStats[user._id][user.epicGamesAccount.platform].duo.placetop5 === undefined ?
                            0 : currentStats[user._id][user.epicGamesAccount.platform].duo.placetop5 - prevStats[user.epicGamesAccount.platform].duo.placetop5;
                        statDoc.placeTop12 = currentStats[user._id][user.epicGamesAccount.platform].duo.placetop12 === undefined ?
                            0 : currentStats[user._id][user.epicGamesAccount.platform].duo.placetop12 - prevStats[user.epicGamesAccount.platform].duo.placetop12;
                        break;
                    case 'squad':
                        statDoc.kills = currentStats[user._id][user.epicGamesAccount.platform].squad.kills === undefined ?
                            0 : currentStats[user._id][user.epicGamesAccount.platform].squad.kills - prevStats[user.epicGamesAccount.platform].squad.kills;
                        statDoc.placeTop1 = currentStats[user._id][user.epicGamesAccount.platform].squad.placetop1 === undefined ?
                            0 : currentStats[user._id][user.epicGamesAccount.platform].squad.placetop1 - prevStats[user.epicGamesAccount.platform].squad.placetop1;
                        statDoc.placeTop3 = currentStats[user._id][user.epicGamesAccount.platform].squad.placetop3 === undefined ?
                            0 : currentStats[user._id][user.epicGamesAccount.platform].squad.placetop3 - prevStats[user.epicGamesAccount.platform].squad.placetop3;
                        statDoc.placeTop6 = currentStats[user._id][user.epicGamesAccount.platform].squad.placetop6 === undefined ?
                            0 : currentStats[user._id][user.epicGamesAccount.platform].squad.placetop6 - prevStats[user.epicGamesAccount.platform].squad.placetop6;
                        break;
                }

                // Reuse currentStats object to store user's performance in the match
                currentStats[user._id] = statDoc;
            }));

            // Update match as complete and remove Redis key
            match.isComplete = true;
            await match.save();
            await asyncRedisClient.del(match.serverId);

            // Update user stats and Elo ratings
            await eloController.updateUserStats(match, users, currentStats);

            return job.stop();
        } else {
            await Promise.all(users.map(async function (user) {
                await asyncRedisClient.hset(match.serverId, user._id.toString(), JSON.stringify(currentStats[user._id]));
                await asyncRedisClient.expire(match.serverId, 1800);
            }));
        }
    });
    job.start();
}

module.exports = {
    getMatches: getMatches,
    getMatch: getMatch,
    putMatch: putMatch
};
