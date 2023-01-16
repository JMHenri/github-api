const request = require('supertest');
const { app } = require('../../app');

describe('GET /prinfo', () => {
    it('should return a 200 status code', async () => {
        const res = await request(app)
            .get('/prinfo')
            .query({ repo: 'test/repo' });
        expect(res.statusCode).toBe(200);
    });
});