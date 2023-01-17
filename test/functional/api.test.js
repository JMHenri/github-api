const request = require('supertest');
const { app } = require('../../app');
const routes = require('../../routes/prinfo');
const github = require('../../lib/github');

jest.mock('../../lib/github');

describe('GET /prinfo', () => {
  it('should return the data for a valid repository', async () => {
      const mockData = [
          {
              id: 1234,
              number: 1,
              title: 'PR title',
              author: 'testuser',
              commits: 2
          }
      ];
      github.getPRInfo.mockResolvedValue(mockData);
      const res = await request(app)
          .get('/prinfo')
          .query({ repo: 'test/repo' });
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mockData);
  });
});

describe('GET /prinfo', () => {
    it('should return a 400 error if no repository URL is provided', async () => {
      const res = await request(app).get('/prinfo');
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('You must provide a repository URL in the format `username/repo`.');
    });
});

describe('GET /prinfo', () => {
    it('should return a 500 error if an error occurs while fetching the data', async () => {
      github.getPRInfo.mockRejectedValueOnce('Error');
      const res = await request(app).get('/prinfo?repo=test/repo');
      expect(res.status).toBe(500);
      expect(res.body.error).toBe('An error occurred while fetching the data.');
    });
});