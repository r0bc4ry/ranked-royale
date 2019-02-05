const express = require('express');
const router = express.Router();

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

router.get('/profile', isAuthenticated, function (req, res, next) {
    res.render('profile', {title: 'Profile', user: req.user});
});

module.exports = router;
