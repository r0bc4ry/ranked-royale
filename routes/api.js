const express = require('express');
const router = express.Router();

const addHours = require('date-fns/add_hours');
const getDate = require('date-fns/get_date');
const getHours = require('date-fns/get_hours');
const getMinutes = require('date-fns/get_minutes');
const getMonth = require('date-fns/get_month');
const getTime = require('date-fns/get_time');
const getYear = require('date-fns/get_year');
const startOfHour = require('date-fns/start_of_hour');
const setMinutes = require('date-fns/set_minutes');

const isAuthenticated = require('../helpers/is-authenticated');
const ranks = require('../ranks');

const connectionsController = require('../controllers/api/connections-controller');
const matchController = require('../controllers/api/match-controller');

router.post('/connections/epic', isAuthenticated, async function (req, res, next) {
    let user;
    try {
        user = await connectionsController.verifyEpicGames(req.body.code, req.user._id);
    } catch (err) {
        if (err) return next(err);
    }

    req.login(user, function (err) {
        if (err) return next(err);

        res.json({
            status: 'success',
            data: {}
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

// Return list of a user's matches
router.get('/matches', isAuthenticated, async function (req, res, next) {
    let matches;
    try {
        matches = await matchController.getMatches(req.user._id);
    } catch (err) {
        if (err) return next(err);
    }

    res.json({
        status: 'success',
        data: {
            matches: matches
        }
    });
});

// Return list of current players in a match
router.get('/matches/:matchId', isAuthenticated, async function (req, res, next) {
    let match;
    try {
        match = await matchController.getMatch(req.user._id, req.params.matchId);
    } catch (err) {
        if (err) return next(err);
    }

    res.json({
        status: 'success',
        data: {
            match: match
        }
    });
});

// Append current player to list of players in a match
router.put('/matches/:serverId', isAuthenticated, async function (req, res, next) {
    try {
        await matchController.putMatch(req.user._id, req.params.serverId);
    } catch (err) {
        if (err) return next(err);
    }

    res.json({
        status: 'success',
        data: {}
    });
});

function handleApiError(res, message, status = 400) {
    res.status(status).json({
        status: 'error',
        message: message
    });
}

module.exports = router;
