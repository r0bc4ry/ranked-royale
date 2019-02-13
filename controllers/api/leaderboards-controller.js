const User = require('../../models/user');

async function getLeaderboard(gameMode = 'solo', platform = 'pc', region) {
    let users;

    let conditions = {};
    if (platform) {
        conditions['epicGamesAccount.platform'] = platform;
    }
    if (region) {
        conditions['epicGamesAccount.region'] = region;
    }

    switch (gameMode) {
        case 'solo':
            conditions['stats.solo.matchesPlayed'] = { $gte: 10 };
            users = await User.find(conditions).sort({'stats.solo.rating': 'descending'}).limit(100).lean().exec();
            break;
        case 'duo':
            conditions['stats.duo.matchesPlayed'] = { $gte: 10 };
            users = await User.find(conditions).sort({'stats.duo.rating': 'descending'}).limit(100).lean().exec();
            break;
        case 'squad':
            conditions['stats.squad.matchesPlayed'] = { $gte: 10 };
            users = await User.find(conditions).sort({'stats.squad.rating': 'descending'}).limit(100).lean().exec();
            break;
    }

    return users;
}

module.exports = {
    getLeaderboard: getLeaderboard
};
