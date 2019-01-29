var express = require('express');
var router = express.Router();
const passport = require('passport');

const GetEventTime = require('../controllers/get-event-time');

router.get('/', function (req, res, next) {
    if (req.user) {
        return res.render('play', GetEventTime());
    } else {
        return res.render('index');
    }
});

router.get('/leaderboard', function (req, res, next) {
    res.render('leaderboard');
});

router.get('/profile', passport.authenticate('local', {failureRedirect: '/'}), function (req, res, next) {
    res.render('profile');
});

module.exports = router;
