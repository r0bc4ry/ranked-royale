const express = require('express');
const router = express.Router();

const CronJob = require('cron').CronJob;
const addHours = require('date-fns/add_hours');
const getDate = require('date-fns/get_date');
const getHours = require('date-fns/get_hours');
const getMinutes = require('date-fns/get_minutes');
const getMonth = require('date-fns/get_month');
const getTime = require('date-fns/get_time');
const getYear = require('date-fns/get_year');
const startOfHour = require('date-fns/start_of_hour');
const setMinutes = require('date-fns/set_minutes');
const mongoose = require('mongoose');
var redis = require('redis');
var redisClient = redis.createClient();
redisClient.on('error', function (err) {
    console.log('Redis Error: ' + err);
});

const epicGamesLauncher = require('../controllers/epic-games-launcher');
const isAuthenticated = require('../helpers/is-authenticated');
const ranks = require('../ranks');

const EpicCode = require('../models/epic-code');
const Match = require('../models/match');
const Stat = require('../models/stat');
const User = require('../models/user');

router.post('/connections/epic', isAuthenticated, function (req, res, next) {
    EpicCode.findOne({code: req.body.code}, async function (err, epicCode) {
        if (err) {
            console.error(err);
            return handleApiError(res, 'Error finding EpicCode document.');
        }
        if (!epicCode) {
            return handleApiError(res, 'Incorrect code; please remove the friend and try again.');
        }
        let profile = await epicGamesLauncher.getProfile(epicCode.epicGamesAccountId);
        User.findOneAndUpdate({_id: req.user._id}, {
            $set: {
                'epicGamesAccount.id': profile.account_id,
                'epicGamesAccount.displayName': profile.display_name
            }
        }, async function (err, updatedUser) {
            if (err) {
                console.error(err);
                return handleApiError(res, 'Error updating User document.');
            }
            await epicGamesLauncher.removeFriend(profile.account_id); // TODO Error check this?
            req.login(updatedUser, function (err) {
                if (err) {
                    console.error(err);
                    return handleApiError(res, 'Error logging in after updating user.');
                }
                return res.status(400).json({
                    status: 'success',
                    data: {
                        user: updatedUser
                    }
                });
            });
        });
    });
});

router.get('/countdown', isAuthenticated, function (req, res, next) {
    let currentTime = new Date();

    // TODO Get user's rank

    let rank = ranks.find((x) => {
        return x.name === 'Bronze'
    });

    // TODO Check if rank exists?

    let eventTime = null;

    for (let minutes of rank.minutes) {
        if (minutes > getMinutes(currentTime)) {
            eventTime = new Date(getYear(currentTime), getMonth(currentTime), getDate(currentTime), getHours(currentTime), minutes, 0, 0);
            break;
        }
    }

    if (eventTime === null) {
        eventTime = setMinutes(startOfHour(addHours(currentTime, 1)), rank.minutes[0]);
    }

    res.json({
        currentTime: getTime(currentTime),
        eventTime: getTime(eventTime)
    });
});

// Return list of current players in a match
router.get('/matches', isAuthenticated, async function (req, res, next) {
    let matches = await Match.find({users: mongoose.Types.ObjectId(req.user._id)});
    res.json({
        status: 'success',
        data: {
            matches: matches.map((match) => ({
                code: match.code,
                gameMode: match.gameMode,
                users: match.users.length
            }))
        }
    });
});

// Return list of current players in a match
router.get('/matches/:matchId', isAuthenticated, function (req, res, next) {
    let matchId = req.params.matchId;

    redisClient.scard(matchId, function (err, cardinality) {
        if (err) {
            console.error(err);
            return handleApiError(res, 'Error checking cardinality with Redis.');
        }
        if (!cardinality) {
            return handleApiError(res, 'Match does not exist.');
        }
        res.json({
            status: 'success',
            data: {
                match: {
                    code: matchCode,
                    gameMode: 'solo',
                    users: cardinality
                }
            }
        });
    });
});

// Append current player to list of players in a match
router.put('/matches/:matchCode', isAuthenticated, function (req, res, next) {
    let matchCode = req.params.matchCode;

    // TODO Add checking to see if this match has recently started
    // Match.findOne({
    //     code: matchCode,
    //     createdAt: {
    //         "$gte": subMinutes(new Date(), 1),
    //         "$lt": new Date()
    //     }
    // }, function (err, match) {
    //     if (err) return console.error(err);
    // });

    redisClient.scard(matchCode, async function (err, cardinality) {
        if (err) {
            console.error(err);
            return handleApiError(res, 'Error checking set cardinality with Redis.');
        }

        redisClient.sadd(matchCode, req.user._id);

        if (!cardinality) {
            try {
                var match = await Match.create({
                    code: matchCode,
                    gameMode: 'solo'
                });
            } catch (err) {
                console.error(err);
                return handleApiError(res, 'Error creating Match document.');
            }

            // After timeout, update the match with participating users
            setTimeout(function () {
                redisClient.smembers(matchCode, async function (err, members) {
                    if (err) return console.error(err);
                    redisClient.del(matchCode);

                    if (members.length < 5) {
                        try {
                            await match.delete();
                        } catch (err) {
                            console.error(err);
                        }
                        return;
                    }

                    match.users = members;
                    try {
                        await match.save();
                    } catch (err) {
                        console.error(err);
                    }
                });
            }, 1000 * 60);
        }

        let matchBeginStats = await epicGamesLauncher.getStats(req.user.epicGamesAccount.id);
        try {
            await Stat.create({
                userId: req.user._id,
                matchId: match._id,
                solo: {
                    score: matchBeginStats.pc.solo.score,
                    minutesPlayed: matchBeginStats.pc.solo.minutesplayed,
                    kills: matchBeginStats.pc.solo.kills,
                    matchesPlayed: matchBeginStats.pc.solo.matchesplayed,
                    placeTop1: matchBeginStats.pc.solo.placetop1,
                    placeTop10: matchBeginStats.pc.solo.placetop10,
                    placeTop25: matchBeginStats.pc.solo.placetop25,
                    lastModified: new Date(matchBeginStats.pc.solo.lastmodified)
                },
                duo: {
                    score: matchBeginStats.pc.duo.score,
                    minutesPlayed: matchBeginStats.pc.duo.minutesplayed,
                    kills: matchBeginStats.pc.duo.kills,
                    matchesPlayed: matchBeginStats.pc.duo.matchesplayed,
                    placeTop1: matchBeginStats.pc.duo.placetop1,
                    placeTop5: matchBeginStats.pc.duo.placetop5,
                    placeTop12: matchBeginStats.pc.duo.placetop12,
                    lastModified: new Date(matchBeginStats.pc.duo.lastmodified)
                },
                squad: {
                    score: matchBeginStats.pc.squad.score,
                    minutesPlayed: matchBeginStats.pc.squad.minutesplayed,
                    kills: matchBeginStats.pc.squad.kills,
                    matchesPlayed: matchBeginStats.pc.squad.matchesplayed,
                    placeTop1: matchBeginStats.pc.squad.placetop1,
                    placeTop3: matchBeginStats.pc.squad.placetop3,
                    placeTop6: matchBeginStats.pc.squad.placetop6,
                    lastModified: new Date(matchBeginStats.pc.squad.lastmodified)
                }
            });
        } catch (err) {
            console.error(err);
            return handleApiError(res, 'Error creating match start Stat document.');
        }

        // Start cron job to get stats every 3 minutes until end of match
        let job = new CronJob('0 */3 * * * *', async function () {
            let matchEndStats = await epicGamesLauncher.getStats(req.user.epicGamesAccount.id);
            if (JSON.stringify(matchBeginStats) !== JSON.stringify(matchEndStats)) {
                try {
                    await Stat.create({
                        userId: req.user._id,
                        solo: {
                            score: matchEndStats.pc.solo.score,
                            minutesPlayed: matchEndStats.pc.solo.minutesplayed,
                            kills: matchEndStats.pc.solo.kills,
                            matchesPlayed: matchEndStats.pc.solo.matchesplayed,
                            placeTop1: matchEndStats.pc.solo.placetop1,
                            placeTop10: matchEndStats.pc.solo.placetop10,
                            placeTop25: matchEndStats.pc.solo.placetop25,
                            lastModified: new Date(matchEndStats.pc.solo.lastmodified)
                        },
                        duo: {
                            score: matchEndStats.pc.duo.score,
                            minutesPlayed: matchEndStats.pc.duo.minutesplayed,
                            kills: matchEndStats.pc.duo.kills,
                            matchesPlayed: matchEndStats.pc.duo.matchesplayed,
                            placeTop1: matchEndStats.pc.duo.placetop1,
                            placeTop5: matchEndStats.pc.duo.placetop5,
                            placeTop12: matchEndStats.pc.duo.placetop12,
                            lastModified: new Date(matchEndStats.pc.duo.lastmodified)
                        },
                        squad: {
                            score: matchEndStats.pc.squad.score,
                            minutesPlayed: matchEndStats.pc.squad.minutesplayed,
                            kills: matchEndStats.pc.squad.kills,
                            matchesPlayed: matchEndStats.pc.squad.matchesplayed,
                            placeTop1: matchEndStats.pc.squad.placetop1,
                            placeTop3: matchEndStats.pc.squad.placetop3,
                            placeTop6: matchEndStats.pc.squad.placetop6,
                            lastModified: new Date(matchEndStats.pc.squad.lastmodified)
                        }
                    });
                } catch (err) {
                    console.error(err);
                }
                job.stop()
            }
        });
        job.start();

        res.json({
            status: 'success',
            data: {
                match: {
                    code: matchCode,
                    gameMode: 'solo',
                    users: cardinality
                }
            }
        });
    });
});

function handleApiError(res, message, status = 400) {
    res.status(status).json({
        status: 'error',
        message: message
    });
}

module.exports = router;
