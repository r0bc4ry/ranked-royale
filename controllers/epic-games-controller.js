const EGClient = require('epicgames-client').Client;
const Fortnite = require('epicgames-fortnite-client');
const randomstring = require('randomstring');

let fortniteGame;
let eg = new EGClient({
    email: process.env.EPIC_EMAIL,
    password: process.env.EPIC_PASSWORD
});

const matchesController = require('../controllers/api/match-controller');
const EpicCode = require('../models/epic-code');
const Match = require('../models/match');
const User = require('../models/user');

(async () => {
    if (!await eg.init() || !await eg.login()) {
        throw 'Error with Epic Games init or login.';
    }

    fortniteGame = await eg.runGame(Fortnite);

    // Remove any pending friend requests to prevent an overflow of friends
    let pendingFriends = await eg.getPendingFriends();
    pendingFriends.forEach(async function (friend) {
        await eg.declineFriendRequest(friend.id);
    });

    let communicator = fortniteGame.communicator;
    communicator.on('friend:request', onFriendRequest);
    communicator.on('friend:removed', onFriendRemoved);

    // In the event of an error crashing the application, restart the unfinished matches
    let unfinsishedMatches = await Match.find({hasEnded: false});
    await Promise.all(unfinsishedMatches.map(async function (match) {
        await matchesController._startMatch(match);
    }));
})();

async function onFriendRemoved(data) {
    let accountId = data.account_id;
    let epicCode = await EpicCode.findOne({'epicGamesAccountId': accountId});
    if (epicCode) {
        epicCode.remove();
    }
}

async function onFriendRequest(data) {
    let accountId = data.account_id;
    let user = await User.findOne({'epicGamesAccount.id': accountId});
    if (user) {
        return await eg.declineFriendRequest(accountId);
    }

    await eg.acceptFriendRequest(accountId);

    let myrandomstring = randomstring.generate({
        length: 6,
        charset: 'numeric'
    });

    await EpicCode.create({
        code: myrandomstring,
        epicGamesAccountId: accountId
    });

    setTimeout(async function () {
        let communicator = fortniteGame.communicator;
        await communicator.sendMessage(accountId, `Your Ranked Royale Code: ${myrandomstring}`);
    }, 2500);
}

async function getStats(accountId) {
    return fortniteGame.getStatsBR(accountId);
}

async function getProfile(accountId) {
    return eg.getProfile(accountId)
}

async function removeFriend(accountId) {
    return eg.removeFriend(accountId)
}

module.exports = {
    getProfile: getProfile,
    getStats: getStats,
    removeFriend: removeFriend
};
