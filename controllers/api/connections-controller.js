const epicGamesController = require('../epic-games-controller');
const EpicCode = require('../../models/epic-code');
const User = require('../../models/user');

async function verifyEpicGames(reqBody, userId) {
    let epicCode = await EpicCode.findOne({code: reqBody.code});
    if (!epicCode) {
        throw 'Incorrect code; please try again.';
    }

    try {
        var epicGamesAccount = await epicGamesController.getProfile(epicCode.epicGamesAccountId);
    } catch (err) {
        console.error(err);
        throw 'Error retrieving Epic Games account.';
    }

    let user = await User.findOneAndUpdate({_id: userId}, {
        $set: {
            'epicGamesAccount.id': epicGamesAccount.id,
            'epicGamesAccount.displayName': epicGamesAccount.displayName,
            'epicGamesAccount.inputType': reqBody.inputType,
            'epicGamesAccount.region': reqBody.region,
        }
    }, {new: true});

    try {
        await epicGamesController.removeFriend(epicGamesAccount.id);
        await epicCode.remove();
    } catch (err) {
        console.error(err);
    }

    return user;
}

module.exports = {
    verifyEpicGames: verifyEpicGames
};
