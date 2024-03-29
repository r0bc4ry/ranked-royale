const express = require('express');
const randomstring = require('randomstring');
const router = express.Router();

const matchesController = require('../controllers/api/matches-controller');
const isAuthenticated = require('../helpers/is-authenticated');

router.get('/joinparty', isAuthenticated, async function (req, res, next) {
    let partyId = req.query.partyId ? req.query.partyId : randomstring.generate({length: 4, charset: 'hex'});
    await matchesController.joinParty(req.user._id.toString(), partyId);
    res.send(`Party ${partyId} joined.`);
});

router.get('/joinmatch', isAuthenticated, async function (req, res, next) {
    let partyId = req.query.partyId ? req.query.partyId : randomstring.generate({length: 4, charset: 'hex'});
    let sessionId = req.query.sessionId ? req.query.sessionId : randomstring.generate({length: 4, charset: 'hex'});
    await matchesController.joinMatch(req.user._id.toString(), partyId, sessionId, 100);
    res.send(`Party ${partyId} joined match ${sessionId}.`);
});

module.exports = router;
