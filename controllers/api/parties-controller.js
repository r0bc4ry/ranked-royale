const asyncRedisClient = require('../../helpers/redis').asyncRedisClient;
const randomstring = require('randomstring');

const User = require('../../models/user');

async function leaveParty(partyId, userId) {
    await asyncRedisClient.srem(`party:${partyId}`, userId);

    let cardinality = asyncRedisClient.scard(`party:${partyId}`);
    if (cardinality === 0) {
        await asyncRedisClient.del(`party:${partyId}`);
        await asyncRedisClient.del(`party:${partyId}:gameMode`);
    }

    // TODO Send out Socket.IO notification
}

async function createParty(userId, gameMode) {
    if (gameMode !== 'duo' && gameMode !== 'squad') {
        throw 'Invalid game mode.';
    }

    // Create party in Redis
    let partyId = randomstring.generate({
        charset: 'hex'
    });

    await asyncRedisClient.sadd(`party:${partyId}`, userId);
    await asyncRedisClient.expire(`party:${partyId}`, 60 * 10);
    await asyncRedisClient.set(`party:${partyId}:gameMode`, gameMode);
    await asyncRedisClient.expire(`party:${partyId}:gameMode`, 60 * 10);

    return partyId;
}

async function joinParty(partyId, userId) {
    let cardinality = await asyncRedisClient.scard(`party:${partyId}`);
    let gameMode = await asyncRedisClient.get(`party:${partyId}:gameMode`);

    if (!cardinality || !gameMode) {
        throw 'Invalid invite link.';
    }

    if ((gameMode === 'duo' && cardinality >= 2) || (gameMode === 'squad' && cardinality >= 4)) {
        throw 'Party is full.'
    }

    await asyncRedisClient.sadd(`party:${partyId}`, userId);
    await asyncRedisClient.expire(`party:${partyId}`, 60 * 60 * 12);
    await asyncRedisClient.expire(`party:${partyId}:gameMode`, 60 * 60 * 12);

    // TODO Send out Socket.IO notification to part members
}

module.exports = {
    leaveParty: leaveParty,
    createParty: createParty,
    joinParty: joinParty
};
