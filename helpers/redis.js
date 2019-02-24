let redis, client;
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    redis = require('redis');
    client = redis.createClient({url: process.env.REDIS_URL});
} else {
    redis = require('redis-mock');
    client = redis.createClient();
}
const asyncRedis = require('async-redis');
const asyncRedisClient = asyncRedis.decorate(client);

module.exports = {
    redisClient: client,
    asyncRedisClient: asyncRedisClient
};
