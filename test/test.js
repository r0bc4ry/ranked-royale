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
    "pc": {
        "duo": {
            "score": 137493,
            "matchesplayed": 824,
            "placetop12": 262,
            "lastmodified": "2019-02-09T00:40:11.000Z",
            "placetop1": 10,
            "minutesplayed": 195,
            "placetop5": 108,
            "kills": 930
        },
        "squad": {
            "score": 36017,
            "placetop3": 14,
            "lastmodified": "2019-01-27T23:41:30.000Z",
            "kills": 301,
            "matchesplayed": 246,
            "minutesplayed": 127,
            "placetop6": 40,
            "placetop1": 5
        },
        "solo": {
            "score": 165686,
            "kills": 1224,
            "lastmodified": "2019-02-10T22:47:46.000Z",
            "matchesplayed": 961,
            "minutesplayed": 212,
            "placetop1": 20,
            "placetop10": 186,
            "placetop25": 396
        }
    }
};
