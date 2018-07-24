const expect = require('expect');
const request = require('supertest');

const { app } = require('../server');

const convertNumberToTextURL = '/api/v1/convertNumberToText';

describe('Server API V1', () => {
    // Before tests we need to wait if dictionary is loaded
    before(done => {
        app.on("app_started", () => done());
    });

    describe('GET /api/v1/convertNumberToText', () => {

        it('should return message about using api because of wrong route', done => {
            request(app)
                .get("/some_strange_route")
                .expect(200)
                .expect(response => {
                    expect(response.res.text).toBe('Please use /api/v1 route for list of available routes.');
                })
                .end(done);
        });

        it('should return array of routes with one object (route)', done => {
            request(app)
                .get("/api/v1")
                .expect(200)
                .expect(response => {
                    expect(response.body.length).toBe(1);
                    const res = response.body[0];
                    expect(res.method).toBe('GET');
                    expect(res.url).toBe(convertNumberToTextURL);
                })
                .end(done);
        });

        it('should return array of 9 words', done => {
            request(app)
                .get(convertNumberToTextURL + '/23')
                .expect(200)
                .expect(response => {
                    expect(response.body.length).toBe(9);
                })
                .end(done);
        });

        it('should return array of 3 words', done => {
            request(app)
                .get(convertNumberToTextURL + '/2')
                .expect(200)
                .expect(response => {
                    expect(response.body.length).toBe(3);
                })
                .end(done);
        });

        it('should return empty array', done => {
            request(app)
                .get(convertNumberToTextURL + '/2333332222255555')
                .expect(200)
                .expect(response => {
                    expect(response.body.length).toBe(0);
                })
                .end(done);
        });
    });
});