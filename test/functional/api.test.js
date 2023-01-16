const request = require('supertest');
const { app } = require('../../app');
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