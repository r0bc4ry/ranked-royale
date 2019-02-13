const randomstring = require('randomstring');

const EGClient = require('epicgames-client').Client;
const Fortnite = require('epicgames-fortnite-client');
const eg = new EGClient({
    email: process.env.EPIC_EMAIL,
    password: process.env.EPIC_PASSWORD
});

// Models
const EpicCode = require('../models/epic-code');
const User = require('../models/user');

let fortniteGame;
let initPromise = (async () => {
    if (!await eg.init() || !await eg.login()) {
        throw 'Error with Epic Games initialize or login process.';
    }

    fortniteGame = await eg.runGame(Fortnite);

    // Remove any pending friend requests from while the bot was offline
    let pendingFriends = await eg.getPendingFriends();
    await Promise.all(pendingFriends.map(async function (friend) {
        await eg.declineFriendRequest(friend.id);
    }));

    let communicator = fortniteGame.communicator;
    communicator.on('friend:removed', _onFriendRemoved);
    communicator.on('friend:request', _onFriendRequest);

    getStatsBR('340194ecfcee44129fb9b65320916176');
})();

async function getStatsBR(id) {
    console.log(`EPIC getStatsBR ${id}`);
    let stats = await fortniteGame.getStatsBR(id);
    ['pc', 'ps4', 'xb1'].forEach(function (platform) {
        stats[platform] = Object.assign({
            solo: {
                score: 0,
                matchesplayed: 0,
                kills: 0,
                placetop25: 0,
                placetop10: 0,
                placetop1: 0,
                lastmodified: new Date().toISOString()
            },
            duo: {
                score: 0,
                matchesplayed: 0,
                kills: 0,
                placetop12: 0,
                placetop5: 0,
                placetop1: 0,
                lastmodified: new Date().toISOString()
            },
            squad: {
                score: 0,
                matchesplayed: 0,
                kills: 0,
                placetop6: 0,
                placetop3: 0,
                placetop1: 0,
                lastmodified: new Date().toISOString()
            },
        }, stats[platform]);
    });
    return stats;
}

async function getProfile(id) {
    console.log(`EPIC getProfile ${id}`);
    return await eg.getProfile(id);
}

async function removeFriend(id) {
    console.log(`EPIC removeFriend ${id}`);
    await eg.removeFriend(id);
}

async function _onFriendRemoved(friend) {
    let epicCode = await EpicCode.findOne({'epicGamesAccountId': friend.id});
    if (epicCode) {
        epicCode.remove();
    }
}

async function _onFriendRequest(friendRequest) {
    let user = await User.findOne({'epicGamesAccount.id': friendRequest.friend.id});
    if (user) {
        return await eg.declineFriendRequest(friendRequest.friend.id);
    }

    await eg.acceptFriendRequest(friendRequest.friend.id);

    let myrandomstring = randomstring.generate({
        length: 6,
        charset: 'numeric'
    });

    await EpicCode.create({
        code: myrandomstring,
        epicGamesAccountId: friendRequest.friend.id
    });

    let communicator = fortniteGame.communicator;
    setTimeout(async function () {
        await communicator.sendMessage(friendRequest.friend.id, `Your Ranked Royale Code: ${myrandomstring}`);
    }, 2000);
}

module.exports = {
    initPromise: initPromise,
    getStatsBR: getStatsBR,
    getProfile: getProfile,
    removeFriend: removeFriend
};
