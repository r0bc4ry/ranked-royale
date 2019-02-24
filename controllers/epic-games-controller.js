const randomstring = require('randomstring');

const {Client, EInputType} = require('epicgames-client');
const Fortnite = require('epicgames-fortnite-client');
const {ESubGame} = Fortnite;
const eg = new Client({
    email: process.env.EPIC_EMAIL,
    password: process.env.EPIC_PASSWORD,
    debug: console.log
});

// Models
const EpicCode = require('../models/epic-code');
const User = require('../models/user');

let fortniteGame, brSubGame;
let initPromise = (async () => {
    if (!await eg.init()) {
        throw new Error('Cannot initialize Epic Games Launcher.');
    }

    if (!await eg.login()) {
        throw new Error('Cannot log in to Epic Games account.');
    }

    fortniteGame = await eg.runGame(Fortnite);
    brSubGame = await fortniteGame.runSubGame(ESubGame.BattleRoyale);

    // Remove any pending codes to prevent an overflow of users
    let friends = await eg.getFriends(true);
    for (let friend of friends) {
        if (friend.status === 'PENDING') {
            await eg.declineFriendRequest(friend.id);
        } else if (friend.id !== 'a9f693302d86467e8a4b5cfd52624bf8') {
            await eg.removeFriend(friend.id);
        }

        let epicCode = await EpicCode.find({epicGamesAccountId: friend.id});
        if (epicCode) {
            await epicCode.remove();
        }
    }

    let communicator = fortniteGame.communicator;
    communicator.on('friend:removed', _onFriendRemoved);
    communicator.on('friend:request', _onFriendRequest);

    // For debugging Fortnite stats
    // let profile = await eg.getProfile('a9f693302d86467e8a4b5cfd52624bf8');
    // console.log(profile);
    // let stats = await brSubGame.getStatsForPlayer('a9f693302d86467e8a4b5cfd52624bf8');
    // console.log(stats);
})();

async function getStatsBR(id, inputType) {
    console.log(`EPIC getStatsBR ${id}`);

    let stats;
    switch (inputType) {
        case 'Controller':
            stats = await brSubGame.getStatsForPlayer(id, EInputType.Controller);
            break;
        case 'Touch':
            stats = await brSubGame.getStatsForPlayer(id, EInputType.Touch);
            break;
        default:
            stats = await brSubGame.getStatsForPlayer(id, EInputType.MouseAndKeyboard);
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
