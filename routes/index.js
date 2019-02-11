const express = require('express');
const router = express.Router();

const distanceInWordsToNow = require('date-fns/distance_in_words_to_now');

const matchesController = require('../controllers/api/match-controller');
const isAuthenticated = require('../helpers/is-authenticated');
const User = require('../models/user');

router.get('/', function (req, res, next) {
    if (req.user) {
        return res.render('play', {title: 'Play', user: req.user});
    } else {
        return res.render('index', {title: 'Home'});
    }
});

router.get('/faq', function (req, res, next) {
    res.render('faq', {title: 'FAQ'});
});

router.get('/leaderboard', function (req, res, next) {
    res.render('leaderboard', {title: 'Leaderboard', user: req.user});
});

router.get('/profile', isAuthenticated, async function (req, res, next) {
    let user = await User.findById(req.user._id);
    req.login(user, async function (err) {
        if (err) console.error(err);

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
});

router.get('/support', function (req, res, next) {
    res.render('support', {title: 'Support', user: req.user});
});

module.exports = router;
