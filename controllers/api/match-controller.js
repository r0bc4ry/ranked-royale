const CronJob = require('cron').CronJob;
const eloController = require('../elo-controller');
const epicGamesController = require('../epic-games-controller');
const mongoose = require('mongoose');
const subMinutes = require('date-fns/sub_minutes');

const asyncRedis = require('async-redis');
const redisClient = asyncRedis.createClient();
redisClient.on('error', function (err) {
    console.log('Redis Error: ' + err);
});

const Match = require('../../models/match');
const Stat = require('../../models/stat');
const User = require('../../models/user');

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

    let cardinality = await redisClient.scard(serverId);

    // Check if this match has recently started
    if (match && cardinality === 0) {
        throw 'This match has already started. You must enter your server ID within 60 seconds of the countdown ending.';
    }

    await redisClient.sadd(serverId, userId);
    await redisClient.expire(serverId, 120);
    global.io.emit(serverId, cardinality + 1); // TODO Add tracking for number of players in match with Socket.io

    if (!match && cardinality === 0) {
        match = await Match.create({
            serverId: serverId,
            gameMode: 'solo'
        });

        // After timeout for users to queue in Redis, begin the match
        setTimeout(function () {
            _startMatch(match);
        }, 1000 * 60);
    }
}

async function _startMatch(match) {
    let members = await redisClient.smembers(match.serverId);
    await redisClient.del(match.serverId);

    // TODO Undo comment for production
    // if (users.length < 5) {
    //     return await match.delete();
    // }

    match.users = members;
    await match.save();

    let userObjectIds = [];
    members.forEach(function (id) {
        userObjectIds.push(mongoose.Types.ObjectId(id));
    });

    let users = await User.find({'_id': userObjectIds}).lean().exec();
    await Promise.all(users.map(async function (user) {
        console.log(`Checking stats for ${user.epicGamesAccount.displayName} at ${Date.now()}`);
        let stats = await epicGamesController.getStats(user.epicGamesAccount.id);
        await redisClient.hset(match.serverId, user._id.toString(), JSON.stringify(stats));
        await redisClient.expire(match.serverId, 1800);
    }));

    // Start cron job to get stats every minute until the match ends
    let job = new CronJob('0 */1 * * * *', async function () {
        let currentStats = {};
        await Promise.all(users.map(async function (user) {
            console.log(`Checking stats for ${user.epicGamesAccount.displayName} at ${Date.now()}`);
            currentStats[user._id] = await epicGamesController.getStats(user.epicGamesAccount.id);
        }));

        let matchEnded = true;
        for (let userId in currentStats) {
            let prevStats = await redisClient.get(`${match.serverId}.${userId}`);
            if (JSON.stringify(currentStats[userId]) === prevStats) {
                matchEnded = false;
                break;
            }
        }

        console.log(`Match Ended: ${matchEnded}`);

        if (matchEnded) {
            await Promise.all(users.map(async function (user) {
                let prevStats = await redisClient.hget(match.serverId, user._id.toString());
                prevStats = JSON.parse(prevStats);

                let doc = {
                    userId: user._id,
                    matchId: match._id
                };

                let numMatches = currentStats[user._id].pc[match.gameMode].matches - prevStats.pc[match.gameMode].matches;
                if (numMatches !== 1) {
                    // TODO Remove user from match users
                    return console.log(`Player's stats reported ${numMatches} matches instead of 1.`);
                }

                switch (match.gameMode) {
                    case 'solo':
                        doc.kills = currentStats[user._id].pc.solo.kills - prevStats.pc.solo.kills;
                        doc.placeTop1 = !!(currentStats[user._id].pc.solo.placetop1 - prevStats.pc.solo.placetop1);
                        doc.placeTop10 = !!(currentStats[user._id].pc.solo.placetop10 - prevStats.pc.solo.placetop10);
                        doc.placeTop25 = !!(currentStats[user._id].pc.solo.placetop25 - prevStats.pc.solo.placetop25);
                        break;
                    case 'duo':
                        doc.kills = currentStats[user._id].pc.duo.kills - prevStats.pc.duo.kills;
                        doc.placeTop1 = !!(currentStats[user._id].pc.duo.placetop1 - prevStats.pc.duo.placetop1);
                        doc.placeTop5 = !!(currentStats[user._id].pc.duo.placetop5 - prevStats.pc.duo.placetop5);
                        doc.placeTop12 = !!(currentStats[user._id].pc.duo.placetop12 - prevStats.pc.duo.placetop12);
                        break;
                    case 'squad':
                        doc.kills = currentStats[user._id].pc.squad.kills - prevStats.pc.squad.kills;
                        doc.placeTop1 = !!(currentStats[user._id].pc.squad.placetop1 - prevStats.pc.squad.placetop1);
                        doc.placeTop3 = !!(currentStats[user._id].pc.squad.placetop3 - prevStats.pc.squad.placetop3);
                        doc.placeTop6 = !!(currentStats[user._id].pc.squad.placetop6 - prevStats.pc.squad.placetop6);
                        break;
                }

                await Stat.create(doc);
            }));
            await redisClient.del(match.serverId);
            job.stop();
            eloController.updateUserStats(match, users);
        } else {
            await Promise.all(users.map(async function (user) {
                await redisClient.hset(match.serverId, user._id.toString(), JSON.stringify(currentStats[user._id]));
                await redisClient.expire(match.serverId, 1800);
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
