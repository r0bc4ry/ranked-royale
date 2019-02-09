const epicGamesLauncherController = require('../epic-games-controller');
const EpicCode = require('../../models/epic-code');
const User = require('../../models/user');

async function verifyEpicGames(authCode, userId) {
    let epicCode = await EpicCode.findOne({code: authCode});

    if (!epicCode) {
        throw 'Incorrect code; please try again.';
    }

    let epicGamesProfile = await epicGamesLauncherController.getProfile(epicCode.epicGamesAccountId);
    await epicGamesLauncherController.removeFriend(epicGamesProfile.account_id);

    return await User.findOneAndUpdate({_id: req.user._id}, {
        $set: {
            'epicGamesAccount.id': epicGamesProfile.account_id,
            'epicGamesAccount.displayName': epicGamesProfile.display_name
        }
    });
}

module.exports = {
    verifyEpicGames: verifyEpicGames
};
