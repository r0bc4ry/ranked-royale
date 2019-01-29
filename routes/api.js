var express = require('express');
var router = express.Router();

// var redis = require('redis');
// var client = redis.createClient();

const GetEventTime = require('../controllers/get-event-time');

router.get('/countdown', function (req, res, next) {
    res.json(GetEventTime());
});

router.get('/matches/:matchId', function (req, res, next) {
    // TODO Return list of current players in a match to the frontend
    client.get(req.params.matchId);
});

router.put('/matches/:matchId', function (req, res, next) {
    // TODO Append current player to list of players in a match
    client.lpush(req.params.matchId, 'Rob13497');
});

module.exports = router;
