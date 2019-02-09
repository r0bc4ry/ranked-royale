const express = require('express');
const router = express.Router();

const distanceInWordsToNow = require('date-fns/distance_in_words_to_now');

const matchesController = require('../controllers/api/match-controller');
const isAuthenticated = require('../helpers/is-authenticated');

router.get('/', function (req, res, next) {
    if (req.user) {
        return res.render('play', {title: 'Play', user: req.user});
    } else {
        return res.render('index', {title: 'Home'});
    }
});

router.get('/leaderboard', function (req, res, next) {
    res.render('leaderboard', {title: 'Leaderboard', user: req.user});
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

module.exports = router;
