const express = require('express');
const router = express.Router();

const distanceInWordsToNow = require('date-fns/distance_in_words_to_now');

const leaderboardsController = require('../controllers/api/leaderboards-controller');
const matchesController = require('../controllers/api/matches-controller');
const isAuthenticated = require('../helpers/is-authenticated');
const User = require('../models/user');

router.get('/', function (req, res, next) {
    if (req.user) {
        return res.render('play', {title: 'Play', user: req.user, host: `//${req.headers.host}`});
    } else {
        return res.render('index', {title: 'Home'});
    }
});

router.get('/faq', function (req, res, next) {
    res.render('faq', {title: 'FAQ'});
});

router.get('/leaderboards', async function (req, res, next) {
    let users = await leaderboardsController.getLeaderboard(req.query.gameMode, req.query.inputType, req.query.region);
    res.render('leaderboards', {
        title: 'Leaderboards',
        user: req.user,
        leaderboard: users,
        gameMode: req.query.gameMode,
        inputType: req.query.inputType,
        region: req.query.region
    });
});

router.get('/profile', isAuthenticated, async function (req, res, next) {
    let matches = await matchesController.getMatches(req.user._id);
    res.render('profile', {
        title: 'Profile',
        matches: matches,
        user: req.user,
        distanceInWordsToNow: {
            solo: distanceInWordsToNow(req.user.stats.solo.updatedAt),
            duo: distanceInWordsToNow(req.user.stats.duo.updatedAt),
            squad: distanceInWordsToNow(req.user.stats.squad.updatedAt)
        },
    });
});

router.get('/support', function (req, res, next) {
    res.render('support', {title: 'Support', user: req.user});
});

module.exports = router;
