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

        it('GET /api/countdown should return first bronze interval', function () {
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

        it('GET /api/countdown should return second bronze interval', function () {
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
