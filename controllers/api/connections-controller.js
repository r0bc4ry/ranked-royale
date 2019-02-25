const epicGamesController = require('../epic-games-controller');
const EpicCode = require('../../models/epic-code');
const User = require('../../models/user');

async function verifyEpicGames(reqBody, userId) {
    let epicCode = await EpicCode.findOne({code: reqBody.code});
    if (!epicCode) {
        throw 'Incorrect code; please try again.';
    }

    let profile;
    try {
        profile = await epicGamesController.getProfile(epicCode.epicGamesAccountId);
    } catch (err) {
        console.error(err);
        throw 'Error retrieving Epic Games account.';
    }

    // Check if Epic Games account was auto-created by PSN
    let displayName = profile.displayName;
    if (displayName === null && profile.externalAuths.psn.externalDisplayName) {
        displayName = profile.externalAuths.psn.externalDisplayName;
    }

    let user = await User.findOneAndUpdate({_id: userId}, {
        $set: {
            'epicGamesAccount.id': profile.id,
            'epicGamesAccount.jid': profile.jid,
            'epicGamesAccount.displayName': displayName,
            'epicGamesAccount.inputType': reqBody.inputType,
            'epicGamesAccount.region': reqBody.region,
        }
    }, {new: true});

    await epicCode.remove();

    return user;
}

module.exports = {
    verifyEpicGames: verifyEpicGames
};
