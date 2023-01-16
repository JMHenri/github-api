const axios = require('axios');
const { maxPRs } = require('../constants.js');

/**
 * @param {string} repoURL - The URL of the repo to get PR info for
 * @returns {Promise<{prData: {id: number, number: number, title: string, author: string, commits: number}[]}>}
 */
 async function getPRInfo(repoURL) {
  try {
    const openPRs = await axios.get(`https://api.github.com/repos/${repoURL}/pulls?state=open`);
    const prData = [];
    for (const pr of openPRs.data) {
      //Only list out up to maxPRs PRs
      if (prData.length === maxPRs) break;
      const prInfo = await axios.get(pr.url);
      const commits = await axios.get(prInfo.data.commits_url);
      prData.push({
        id: prInfo.data.id,
        number: prInfo.data.number,
        title: prInfo.data.title,
        author: prInfo.data.user.login,
        commits: commits.data.length
      });
    }
    return prData;
  } catch (error) {
    if (error.response.status === 404) {
      return []
    }
    throw error
  }
}

module.exports = {
  getPRInfo
};