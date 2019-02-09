var EloRank = require('elo-rank');
var elo = new EloRank();

const Match = require('../models/mastch');
const User = require('../models/user');

function updateUserStats(match, users) {
    // At the end of a game, make a list of all the players and sort it by performance.
    // Think of each player as having played two matches: a loss vs. the player right above him on the list, and a win vs. the player right below him.
    // Update each player's rating accordingly using the two-player Elo equations.
    
    // 0.42857142857142857142857142857143 SOLO
    // 0.375 DUO
    // 0.25 SQUAD

    // Gets expected score for first parameter
    var expectedScoreA = elo.getExpected(playerA, playerB);
    var expectedScoreB = elo.getExpected(playerB, playerA);

    // Update score, 1 if won 0 if lost
    playerA = elo.updateRating(expectedScoreA, 1, playerA);
    playerB = elo.updateRating(expectedScoreB, 0, playerB);
}

module.exports = {
    updateUserStats: updateUserStats
};
