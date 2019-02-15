const User = require('../../models/user');

async function getLeaderboard(gameMode = 'solo', inputType, region) {
    let users;

    let conditions = {};
    if (inputType) {
        conditions['epicGamesAccount.inputType'] = inputType;
    }
    if (region) {
        conditions['epicGamesAccount.region'] = region;
    }

    conditions[`stats.${gameMode}.matchesPlayed`] = {$gte: 10};

    switch (gameMode) {
        case 'solo':
            users = await User.find(conditions).sort({'stats.solo.rating': 'descending'}).limit(100).lean().exec();
            break;
        case 'duo':
            users = await User.find(conditions).sort({'stats.duo.rating': 'descending'}).limit(100).lean().exec();
            break;
        case 'squad':
            users = await User.find(conditions).sort({'stats.squad.rating': 'descending'}).limit(100).lean().exec();
            break;
    }

    return users;
}

module.exports = {
    getLeaderboard: getLeaderboard
};
