const express = require('express');
const router = express.Router();

const addHours = require('date-fns/add_hours');
const addMinutes = require('date-fns/add_minutes');
const getDate = require('date-fns/get_date');
const getHours = require('date-fns/get_hours');
const getMinutes = require('date-fns/get_minutes');
const getMonth = require('date-fns/get_month');
const getTime = require('date-fns/get_time');
const getYear = require('date-fns/get_year');
const startOfHour = require('date-fns/start_of_hour');
const setMinutes = require('date-fns/set_minutes');
const CronJob = require('cron').CronJob;

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
const SoloStat = require('../models/solo-stat');
const User = require('../models/user');

router.post('/connections/epic', isAuthenticated, async function (req, res, next) {
    EpicCode.findOne({code: req.body.code}, function (err, epicCode) {
        if (err) {
            throw err;
        }
        if (!epicCode) {
            return res.json(400, {
                status: 'error',
                message: 'Incorrect code; please check and try again.'
            });
        }
        // TODO Update user
        epicGamesLauncher.getProfile(epicCode.epicGamesAccountId).then(function (profile) {
            User.findOneAndUpdate({_id: req.user._id}, {
                $set: {
                    'epicGamesAccount.id': profile.account_id,
                    'epicGamesAccount.displayName': profile.display_name
                }
            }, function (err, updatedUser) {
                if (err) {
                    return res.json(400, {
                        status: 'error',
                        message: 'Error updating user.'
                    });
                }
                epicGamesLauncher.removeFriend(profile.account_id); // TODO Error check this?
                return res.json(400, {
                    status: 'success',
                    data: {
                        user: updatedUser
                    }
                });
                // TODO Update passport
                // req.session.passport.user.updatedfield= 'updatedvalue'
            });
        });
    });
    // epicCode.remove();
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
router.get('/matches/:matchId', isAuthenticated, function (req, res, next) {
    let matchId = req.params.matchId;

    redisClient.scard(matchId, function (err, reply) {
        if (!reply) {
            return res.json(400, {
                status: 'error',
                message: 'Match does not exist.'
            });
        }
        res.json({
            status: 'success',
            data: {
                match: {
                    cardinality: reply
                }
            }
        });
    });
});

// Append current player to list of players in a match
router.put('/matches/:matchCode', isAuthenticated, function (req, res, next) {
    let matchCode = req.params.matchCode;
    redisClient.scard(matchCode, async function (err, reply) {
        if (!reply) {
            // TODO Add checking to see if this match has already started
            redisClient.sadd(matchCode, JSON.stringify(req.user.epicGamesAccount));

            let beginMatchJob = new CronJob(addMinutes(Date.now(), 1), function () {
                console.log('Begin match!');
                console.log(redisClient.smembers(matchCode));
                // Match.create({
                //     code: matchCode,
                //     type: 'solo',
                //     players: [players]
                // }, function (err, soloStat) {
                //     // TODO
                // });
                redisClient.del(matchCode);
            });
            beginMatchJob.start();
        } else {
            redisClient.sadd(matchCode, JSON.stringify(req.user.epicGamesAccount));
        }

        let matchBeginStats = await epicGamesLauncher.getStats('a9f693302d86467e8a4b5cfd52624bf8');
        SoloStat.create({
            userId: req.user._id,
            score: matchBeginStats.pc.solo.score,
            minutesPlayed: matchBeginStats.pc.solo.minutesplayed,
            kills: matchBeginStats.pc.solo.kills,
            matchesPlayed: matchBeginStats.pc.solo.matchesplayed,
            placeTop25: matchBeginStats.pc.solo.placetop25,
            placeTop10: matchBeginStats.pc.solo.placetop10,
            placeTop1: matchBeginStats.pc.solo.placetop1
        }, function (err, soloStat) {
            if (err) {
                res.json(400, {
                    status: 'error',
                    message: 'Error creating match start SoloStat document.'
                });
            }

            // Start job to get stats every 3 minutes until updated
            let updateStatsJob = new CronJob('0 */3 * * * *', async function () {
                console.log('Update Stats');

                let matchEndStats = await epicGamesLauncher.getStats('a9f693302d86467e8a4b5cfd52624bf8');
                SoloStat.findOne({userId: req.user._id}, {sort: {'createdAt': -1}}, function (err, soloStat) {
                    if (err) {
                        console.error('Error finding SoloStat document.');
                    }

                    if (JSON.stringify(soloStat) !== JSON.stringify(matchEndStats)) {
                        SoloStat.create({
                            userId: req.user._id,
                            score: matchBeginStats.pc.solo.score,
                            minutesPlayed: matchBeginStats.pc.solo.minutesplayed,
                            kills: matchBeginStats.pc.solo.kills,
                            matchesPlayed: matchBeginStats.pc.solo.matchesplayed,
                            placeTop25: matchBeginStats.pc.solo.placetop25,
                            placeTop10: matchBeginStats.pc.solo.placetop10,
                            placeTop1: matchBeginStats.pc.solo.placetop1
                        }, function (err, soloStat) {
                            if (err) {
                                console.error('Error creating match end SoloStat document.');
                            }

                            updateStatsJob.stop();
                        });
                    }
                });
            });
            updateStatsJob.start();
        });
        redisClient.scard(matchCode, function (err, reply) {
            res.json({
                status: 'success',
                data: {
                    match: {
                        cardinality: reply
                    }
                }
            });
        });
    });
});

module.exports = router;
