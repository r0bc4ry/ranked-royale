const Match = require('../../models/match');
const Stat = require('../../models/stat');

async function updateStats(user, startStat, endStat) {
    var match = await Match.findById(matchId).lean().exec();

    if (!match) {
        throw 'Match does not exist.';
    }

    var stats = await Stat.find({
        userId: userId,
        matchId: matchId
    }).sort({createdAt: 'ascending'}).lean().exec();

    if (!stats) {
        throw 'User does not have permission to view this match.';
    }

    if (stats.length === 2) {
        match.performance = {
            kills: stats[1].solo.kills - stats[0].solo.kills,
            placeTop1: stats[1].solo.placeTop1 - stats[0].solo.placeTop1,
            placeTop10: stats[1].solo.placeTop10 - stats[0].solo.placeTop10,
            placeTop25: stats[1].solo.placeTop25 - stats[0].solo.placeTop25
        }
    }
    user.stats.solo.kills += startStat.solo.kills - endStat.solo.kills;
    user.stats.solo.placeTop25 += startStat.solo.placeTop25 - endStat.solo.placeTop25;
    user.stats.solo.placeTop10 += startStat.solo.placeTop10 - endStat.solo.placeTop10;
    user.stats.solo.placeTop1 += startStat.solo.placeTop1 - endStat.solo.placeTop1;

    await user.save();
    return user;
}

module.exports = {
    updateStats: updateStats
};
