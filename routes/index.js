const distanceInWordsToNow = require('date-fns/distance_in_words_to_now');
const express = require('express');
const router = express.Router();

const leaderboardsController = require('../controllers/api/leaderboards-controller');
const matchesController = require('../controllers/api/matches-controller');
const partiesController = require('../controllers/api/parties-controller');
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

router.get('/invite/:partyId', isAuthenticated, async function (req, res, next) {
    try {
        await partiesController.joinParty(req.params.partyId, req.user._id);
    } catch (err) {
        if (typeof err === 'string') {
            req.flash('error', err);
        } else {
            console.error(err);
        }
        return res.redirect('/');
    }

    if (req.session.partyId) {
        await partiesController.leaveParty(req.session.partyId, req.user._id);
        delete req.session.partyId;
    }
    req.session.partyId = req.params.partyId;

    return res.redirect('/play');
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

let gameModeCounter = {
    solo: 0,
    duo: 0,
    squad: 0
};

router.get('/play/:gameMode(solo|duo|squad)', isAuthenticated, async function (req, res, next) {
    // When switching game modes, remove user from existing party (if any)
    if (req.session.partyId) {
        await partiesController.leaveParty(req.session.partyId, req.user._id);
        delete req.session.partyId;
    }

    const io = req.app.get('socketio');
    io.on('connection', function (socket) {
        socket.join(req.params.gameMode);
        io.in(req.params.gameMode).emit(++gameModeCounter[req.params.gameMode]);

        socket.on('disconnect', function () {
            io.in(req.params.gameMode).emit(--gameModeCounter[req.params.gameMode]);
        });
    });

    return res.render('play', {
        title: 'Play',
        user: req.user,
        gameMode: req.params.gameMode,
        host: `//${req.headers.host}`
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
