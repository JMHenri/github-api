const axios = require('axios');
const { getPRInfo } = require('../../lib/github.js');

jest.mock('axios');

describe('getPRInfo', () => {
    it('should return the correct data for a valid repository', async () => {
      const mockData = {
          data: {
              id: 1234,
              number: 1,
              title: 'PR title',
              pulls_url: "https://api.github.com/repos/test/repo/pulls{/number}",
              commits_url: "https://api.github.com/repos/test/repo/commits/{sha}",
              user: {
                  login: 'testuser'
              }
          }
      };
      const mockPullsData = { data: [{
          id: 1234,
          user: { login: 'testuser' }
      }]};
      const mockCommitsData = { data: [{}, {}]};
      axios.get.mockResolvedValueOnce(mockPullsData);
      axios.get.mockResolvedValueOnce(mockData);
      axios.get.mockResolvedValueOnce(mockCommitsData);
      const result = await getPRInfo('test/repo');
      console.log(result)

      expect(result).toEqual([
              {
                  id: 1234,
                  number: 1,
                  title: 'PR title',
                  author: 'testuser',
                  commits: 2
              }
          ]
      );
    });
  });

  describe('getPRInfo', () => {
    it('should return an empty array for a non-existent repository', async () => {
        const mockError = { response: { status: 404 } };
        axios.get.mockRejectedValueOnce(mockError);
        const result = await getPRInfo('invalid/repo');
        expect(result).toEqual([]);
    });

    it('should return an empty array if there are no open pull requests', async () => {
        const mockData = { data: [] };
        axios.get.mockResolvedValueOnce(mockData);
        const result = await getPRInfo('test/repo');
        expect(result).toEqual([]);
    });
});