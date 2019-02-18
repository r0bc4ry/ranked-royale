const randomstring = require('randomstring');

const {Client, EInputType} = require('epicgames-client');
const Fortnite = require('epicgames-fortnite-client');
const eg = new Client({
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

    // Remove any pending codes to prevent an overflow of users
    let friends = await eg.getFriends(true);
    for (let friend of friends) {
        let epicCode = await EpicCode.find({epicGamesAccountId: friend.id});
        if (epicCode) {
            await eg.declineFriendRequest(friend.id);
            await epicCode.remove();
        }
    }

    let communicator = fortniteGame.communicator;
    communicator.on('friend:removed', _onFriendRemoved);
    communicator.on('friend:request', _onFriendRequest);

    // For debugging Fortnite stats
    // let stats = await fortniteGame.getStatsBR('a9f693302d86467e8a4b5cfd52624bf8', EInputType.MouseAndKeyboard);
    // console.log(JSON.stringify(stats));
})();

async function getStatsBR(id, inputType) {
    console.log(`EPIC getStatsBR ${id}`);

    let stats;
    switch (inputType) {
        case 'Controller':
            stats = await fortniteGame.getStatsBR(id, EInputType.Controller);
            break;
        case 'Touch':
            stats = await fortniteGame.getStatsBR(id, EInputType.Touch);
            break;
        default:
            stats = await fortniteGame.getStatsBR(id, EInputType.MouseAndKeyboard);
            break;
    }

    for (let key in stats) {
        if (key === 'defaultsolo' || key === 'defaultduo' || key === 'defaultsquad') {
            continue;
        } else {
            delete stats[key];
        }
    }

    stats['defaultsolo'] = Object.assign({
        score: 0,
        matchesPlayed: 0,
        minutesPlayed: 0,
        kills: 0,
        playersOutLived: 0,
        placeTop25: 0,
        placeTop10: 0,
        placeTop1: 0,
        lastModified: new Date().toISOString()
    }, stats['defaultsolo']);

    stats['defaultduo'] = Object.assign({
        score: 0,
        matchesPlayed: 0,
        minutesPlayed: 0,
        kills: 0,
        playersOutLived: 0,
        placeTop12: 0,
        placeTop5: 0,
        placeTop1: 0,
        lastModified: new Date().toISOString()
    }, stats['defaultduo']);

    stats['defaultsquad'] = Object.assign({
        score: 0,
        matchesPlayed: 0,
        minutesPlayed: 0,
        kills: 0,
        playersOutLived: 0,
        placeTop6: 0,
        placeTop3: 0,
        placeTop1: 0,
        lastModified: new Date().toISOString()
    }, stats['defaultsquad']);

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
