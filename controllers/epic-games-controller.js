const randomstring = require('randomstring');

const {Client, EInputType, EPartyPrivacy} = require('epicgames-client');
const Fortnite = require('epicgames-fortnite-client');
const {ESubGame} = Fortnite;
const eg = new Client({
    email: process.env.EPIC_EMAIL,
    password: process.env.EPIC_PASSWORD,
    debug: console.log
});

const EpicCode = require('../models/epic-code');
const User = require('../models/user');

let fortniteGame, brSubGame;
let init = (async () => {
    if (!await eg.init()) {
        throw new Error('Cannot initialize Epic Games Launcher.');
    }

    if (!await eg.login()) {
        throw new Error('Cannot log in to Epic Games account.');
    }

    fortniteGame = await eg.runGame(Fortnite);
    brSubGame = await fortniteGame.runSubGame(ESubGame.BattleRoyale);

    // Remove any pending codes to prevent an overflow of users
    let pendingFriends = await eg.getPendingFriends();
    for (let pendingFriend of pendingFriends) {
        await eg.declineFriendRequest(pendingFriend.id);
        await EpicCode.findOneAndDelete({epicGamesAccountId: pendingFriend.id});
    }

    let communicator = fortniteGame.communicator;
    communicator.on('friend:removed', _onFriendRemoved);
    communicator.on('friend:request', _onFriendRequest);
    communicator.on('friend:status', _onFriendStatus);
    communicator.updateStatus('RankedRoyale.com');

    // For debugging Fortnite stats
    // let profile = await eg.getProfile('a9f693302d86467e8a4b5cfd52624bf8');
    // console.log(profile);
    // let stats = await brSubGame.getStatsForPlayer('a9f693302d86467e8a4b5cfd52624bf8');
    // console.log(stats);
})();

async function getStatsForPlayer(id, inputType) {
    console.log(`EPIC getStatsForPlayer ${id}`);

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

    stats['defaultduo'].placeTop5 = stats['defaultduo'].placetop5;
    delete stats['defaultduo'].placetop5;

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

async function hasFriend(id) {
    console.log(`EPIC hasFriend ${id}`);
    return await eg.hasFriend(id);
}

async function _onFriendRemoved(friend) {
    let epicCode = await EpicCode.findOne({'epicGamesAccountId': friend.id});
    if (epicCode) {
        epicCode.remove();
    }
}

async function _onFriendRequest(friendRequest) {
    await eg.acceptFriendRequest(friendRequest.friend.id);

    let user = await User.findOne({'epicGamesAccount.id': friendRequest.friend.id});
    if (user) {
        return;
    }

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

async function _onFriendStatus(communicatorStatus) {
    let status = communicatorStatus.status;

    // Battle Royale Lobby - 1 / 4
    let lobbyRegex = /^Battle Royale Lobby - (\d) \/ 4$/g;
    let lobbyMatch = lobbyRegex.exec(status);

    // Playing Battle Royale - 100 Left - 1 / 4
    let isPlayingRegex = /^Playing Battle Royale - (\d+) Left - (\d) \/ 4$/g;
    let isPlayingMatch = isPlayingRegex.exec(status);

    if (!lobbyMatch && !isPlayingMatch) {
        return;
    }

    // Check if user with this Epic Games account ID exists
    let user = await User.findOne({
        'epicGamesAccount.id': communicatorStatus.sender.id
    }).lean().exec();

    if (!user) {
        return;
    }

    const matchesController = require('./api/matches-controller');
    if (lobbyMatch) {
        return matchesController.joinParty(user._id.toString(), communicatorStatus.partyJoinData.partyId);
    }
    if (isPlayingMatch) {
        return matchesController.joinMatch(communicatorStatus.partyJoinData.partyId, communicatorStatus.sessionId, isPlayingMatch[1]);
    }
}

module.exports = {
    init: init,
    getStatsForPlayer: getStatsForPlayer,
    getProfile: getProfile,
    hasFriend: hasFriend
};
