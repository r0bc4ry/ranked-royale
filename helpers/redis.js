const redis = require('redis');
const client = redis.createClient({
    url: process.env.REDIS_URL
});

client.on('error', function (err) {
    console.error('Redis Error: ' + err);
});

const asyncRedis = require('async-redis');
const asyncRedisClient = asyncRedis.decorate(client);

module.exports = {
    client: client,
    asyncRedisClient: asyncRedisClient
};
