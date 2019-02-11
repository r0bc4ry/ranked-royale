var EloRank = require('elo-rank');
var elo = new EloRank();

const Stat = require('../models/stat');
const User = require('../models/user');

async function updateUserStats(match, users, performanceStats) {
    // At the end of a match, make a list of all the players and sort it by performance
    let userScores = [];
    await Promise.all(users.map(async function (user) {
        let userPerformance = {
            userId: user._id,
            score: performanceStats[user._id].kills * 1
        };
        if (performanceStats[user._id].placeTop25) userPerformance.scored += 4;
        if (performanceStats[user._id].placeTop10) userPerformance.scored += 4;
        if (performanceStats[user._id].placeTop1) userPerformance.scored += 4;
        userScores.push(userPerformance);
    }));

    userScores.sort(function (a, b) {
        return b.score - a.score;
    });

    // Think of each player as having played two matches: a loss vs. the player right above them on the list and a win vs. the player right below them
    for (const [index, userScore] of userScores.entries()) {
        let userA = users.find(function (element) {
            return element._id === userScore.userId;
        });

        if (index !== userScores.length - 1) {
            let userB = users.find(function (element) {
                return element._id === userScores[index + 1].userId;
            });

            // Gets expected score for first parameter
            let expectedScoreA = elo.getExpected(userA.stats[match.gameMode].rank, userB.stats[match.gameMode].rank);
            let expectedScoreB = elo.getExpected(userB.stats[match.gameMode].rank, userA.stats[match.gameMode].rank);

            // Update score, 1 if won 0 if lost
            let playerARank = elo.updateRating(expectedScoreA, 1, playerA);
            let playerBRank = elo.updateRating(expectedScoreB, 0, playerB);

            performanceStats[userA._id].eloDelta = playerARank - userA.stats[match.gameMode].rank;
            performanceStats[userB._id].eloDelta = playerBRank - userB.stats[match.gameMode].rank;
        } else {
            if (!performanceStats[userA._id].hasOwnProperty('eloDelta')) {
                performanceStats[userA._id].eloDelta = 0;
            }
        }
    }

    // Create Stat documents
    await Promise.all(users.map(async function (user) {
        await user.update({
            $inc: {
                'stats.solo.rank': performanceStats[user._id].eloDelta,
                'stats.solo.matchesPlayed': 1,
                'stats.solo.kills': performanceStats[user._id].kills,
                'stats.solo.placeTop25': performanceStats[user._id].placeTop25,
                'stats.solo.placeTop10': performanceStats[user._id].placeTop10,
                'stats.solo.placeTop1': performanceStats[user._id].placeTop1
            },
            $set: {
                'stats.solo.updatedAt': new Date()
            }
        });
        performanceStats[user._id].placeTop1 = !!performanceStats[user._id].placeTop1;
        performanceStats[user._id].placeTop10 = !!performanceStats[user._id].placeTop10;
        performanceStats[user._id].placeTop25 = !!performanceStats[user._id].placeTop25;
        await Stat.create(performanceStats[user._id]);
    }));
}

module.exports = {
    updateUserStats: updateUserStats
};
