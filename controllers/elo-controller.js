var Elo = require('arpad');
var elo = new Elo(32, 1, 3000);

const Stat = require('../models/stat');

async function updateUserStats(match, users, statDocs) {
    // At the end of a match, make a list of all the players and sort it by performance
    let userScores = [];
    await Promise.all(users.map(async function (user) {
        let userScore = {
            userId: user._id,
            score: statDocs[user._id].kills * 1
        };
        if (statDocs[user._id].placeTop25) userScore.score += 4;
        if (statDocs[user._id].placeTop10) userScore.score += 4;
        if (statDocs[user._id].placeTop1) userScore.score += 4;
        userScores.push(userScore);
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

            let playerARating = userA.stats[match.gameMode].rating;
            let playerBRating = userB.stats[match.gameMode].rating;

            // Gets expected score for first parameter
            let oddsPlayerAWins = elo.expectedScore(playerARating, playerBRating);
            let oddsPlayerBWins = elo.expectedScore(playerBRating, playerARating);

            // Update score: 1 if won, 0.5 is draw, 0 if lost
            let updatedPlayerARating = elo.newRating(oddsPlayerAWins, userA.score === userB.score ? 0.5 : 1, playerARating);
            let updatedPlayerBRating = elo.newRating(oddsPlayerBWins, userA.score === userB.score ? 0.5 : 0, playerBRating);

            statDocs[userA._id].eloDelta = updatedPlayerARating - playerARating;
            statDocs[userB._id].eloDelta = updatedPlayerBRating - playerBRating;
        } else {
            if (!statDocs[userA._id].hasOwnProperty('eloDelta')) {
                statDocs[userA._id].eloDelta = 0;
            }
        }
    }

    // Create Stat documents
    await Promise.all(users.map(async function (user) {
        await user.update({
            $inc: {
                'stats.solo.rating': statDocs[user._id].eloDelta,
                'stats.solo.matchesPlayed': 1,
                'stats.solo.kills': statDocs[user._id].kills,
                'stats.solo.placeTop25': statDocs[user._id].placeTop25,
                'stats.solo.placeTop10': statDocs[user._id].placeTop10,
                'stats.solo.placeTop1': statDocs[user._id].placeTop1
            },
            $set: {
                'stats.solo.updatedAt': new Date()
            }
        });
        statDocs[user._id].placeTop1 = !!statDocs[user._id].placeTop1;
        statDocs[user._id].placeTop10 = !!statDocs[user._id].placeTop10;
        statDocs[user._id].placeTop25 = !!statDocs[user._id].placeTop25;
        await Stat.create(statDocs[user._id]);
    }));
}

module.exports = {
    updateUserStats: updateUserStats
};
