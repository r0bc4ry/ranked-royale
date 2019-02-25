const express = require('express');
const moment = require('moment');
const router = express.Router();

const epicGamesController = require('../controllers/epic-games-controller');
const leaderboardsController = require('../controllers/api/leaderboards-controller');
const matchesController = require('../controllers/api/matches-controller');
const isAuthenticated = require('../helpers/is-authenticated');
const User = require('../models/user');

router.get('/', function (req, res, next) {
    if (req.user) {
        return res.redirect('/play/solo');
    }
    return res.render('index', {title: 'Home'});
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

router.get('/play/:gameMode(solo|duo|squad)', isAuthenticated, async function (req, res, next) {
    if (!req.session.isFriend) {
        req.session.isFriend = await epicGamesController.hasFriend(req.user.epicGamesAccount.id);
    }

    return res.render('play', {
        title: 'Play',
        user: req.user,
        gameMode: req.params.gameMode,
        host: `//${req.headers.host}`,
        isFriend: req.session.isFriend
    });
});

router.get('/profile', isAuthenticated, async function (req, res, next) {
    let user = await User.findById(req.user._id);
    req.login(user, async function (err) {
        if (err) return next(err);

        let matches = await matchesController.getMatches(req.user._id);
        res.render('profile', {
            title: 'Profile',
            matches: matches,
            user: req.user,
            distanceInWordsToNow: {
                solo: moment.duration(moment(req.user.stats.solo.updatedAt).diff(moment())).humanize(true),
                duo: moment.duration(moment(req.user.stats.duo.updatedAt).diff(moment())).humanize(true),
                squad: moment.duration(moment(req.user.stats.squad.updatedAt).diff(moment())).humanize(true)
            },
        });
    });
});

router.get('/support', function (req, res, next) {
    res.render('support', {title: 'Support', user: req.user});
});

module.exports = router;
