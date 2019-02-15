var myApp = require('../bin/www');
var request = require('supertest');
var sinon = require('sinon');

describe('Load Express', function () {
    beforeEach(function () {
        sandbox = sinon.createSandbox();
    });

    afterEach(function () {
        myApp.close();
        sandbox.restore();
    });

    it('200 /', function (done) {
        request(myApp)
            .get('/')
            .expect(200, done);
    });

    it('404 /foo/bar', function (done) {
        request(myApp)
            .get('/foo/bar')
            .expect(404, done);
    });

    describe('Test API', function (done) {
        afterEach(function () {
            clock.restore();
        });

        it('GET /api/countdown should return first interval', function () {
            let now = new Date(2019, 0, 1, 0, 0, 0, 0);
            clock = sinon.useFakeTimers(now);

            return request(myApp)
                .get('/api/countdown')
                .expect('Content-Type', /json/)
                .expect({
                    currentTime: now.getTime(),
                    eventTime: new Date(2019, 0, 1, 0, 30, 0, 0).getTime()
                }, done);

        });

        it('GET /api/countdown should return second interval', function () {
            let now = new Date(2019, 0, 1, 0, 30, 0, 0);
            clock = sinon.useFakeTimers(now);

            return request(myApp)
                .get('/api/countdown')
                .expect('Content-Type', /json/)
                .expect({
                    currentTime: now.getTime(),
                    eventTime: new Date(2019, 0, 1, 1, 0, 0, 0).getTime()
                }, done);
        });
    });
});

let epicData = {
    "defaultduo": {
        "score": 36041,
        "matchesPlayed": 681,
        "minutesPlayed": 1623,
        "kills": 351,
        "playersOutLived": 12116,
        "placeTop12": 191,
        "placetop5": 72,
        "placeTop1": 8,
        "lastModified": "2019-02-15T02:31:09.000Z"
    },
    "defaultsquad": {
        "score": 2639,
        "matchesPlayed": 175,
        "minutesPlayed": 112,
        "kills": 109,
        "playersOutLived": 896,
        "placeTop6": 31,
        "placeTop3": 11,
        "placeTop1": 4,
        "lastModified": "2018-12-16T21:48:09.000Z"
    },
    "defaultsolo": {
        "score": 13677,
        "matchesPlayed": 167,
        "minutesPlayed": 817,
        "kills": 125,
        "playersOutLived": 2980,
        "placeTop25": 46,
        "placeTop10": 16,
        "placeTop1": 0,
        "lastModified": "2019-02-13T22:16:16.000Z"
    }
};
