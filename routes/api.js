const express = require('express');
const moment = require('moment');
const mongoose = require('mongoose');
const router = express.Router();

const connectionsController = require('../controllers/api/connections-controller');
const matchController = require('../controllers/api/matches-controller');
const isAuthenticated = require('../helpers/is-authenticated');

router.post('/connections/epic', isAuthenticated, async function (req, res, next) {
    if (!req.body.code || !req.body.inputType || !req.body.region) {
        return apiError(res, 'Input type, region, and code required.');
    }

    try {
        var user = await connectionsController.verifyEpicGames(req.body, req.user._id);
    } catch (err) {
        if (typeof err === 'string') {
            return apiError(res, err);
        } else {
            console.error(err);
            return apiError(res, 'Error verifying Epic Games account.');
        }
    }

    req.login(user, function (err) {
        if (err) {
            console.error(err);
            return apiError(res, 'Error updating logged in user. Please log out and log back in.');
        }

        res.json({
            status: 'success',
            data: {}
        });
    });
});

router.get('/countdown', isAuthenticated, function (req, res, next) {
    const currentTime = moment();
    const interval = 1000 * 60 * 30; // Minutes to milliseconds
    const eventTime = moment(Math.ceil(+currentTime / interval) * interval);

    // Should be on the 10's and 40's
    if (req.query.gameMode === 'duo') {
        if (currentTime.minutes() < 10) {
            eventTime.subtract(20, 'minutes');
        } else {
            eventTime.add(10, 'minutes');
        }
    }

    // Should be on the 20's and 50's
    if (req.query.gameMode === 'squad') {
        if (currentTime.minutes() < 20) {
            eventTime.subtract(10, 'minutes');
        } else {
            eventTime.add(20, 'minutes');
        }
    }

    res.json({
        status: 'success',
        data: {
            currentTime: +currentTime,
            eventTime: +eventTime
        }
    });
});

// Return list of a user's matches
router.get('/matches', isAuthenticated, async function (req, res, next) {
    let matches;
    try {
        matches = await matchController.getMatches(req.user._id);
    } catch (err) {
        if (typeof err === 'string') {
            return apiError(res, err);
        } else {
            console.error(err);
            return apiError(res, 'Error returning matches.');
        }
    }

    res.json({
        status: 'success',
        data: {
            matches: matches
        }
    });
});

// Return list of current players in a user's match
router.get('/matches/:matchId', isAuthenticated, async function (req, res, next) {
    if (!mongoose.Types.ObjectId.isValid(req.params.matchId)) {
        return apiError(res, 'Invalid match ID.');
    }

    let match;
    try {
        match = await matchController.getMatch(req.user._id, req.params.matchId);
    } catch (err) {
        if (typeof err === 'string') {
            return apiError(res, err);
        } else {
            console.error(err);
            return apiError(res, 'Error returning match.');
        }
    }

    res.json({
        status: 'success',
        data: {
            match: match
        }
    });
});

function apiError(res, message, status = 400) {
    res.status(status).json({
        status: 'error',
        message: message
    });
}

module.exports = router;
