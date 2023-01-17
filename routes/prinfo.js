const github = require('../lib/github.js');
const { app } = require('../app');

app.get('/prinfo', async (req, res) => {
  const repo = req.query.repo;
  if (!repo) {
    return res.status(400).send({ error: 'You must provide a repository URL in the format `username/repo`.' });
  }
  try {
    const data = await github.getPRInfo(repo);
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ error: 'An error occurred while fetching the data.' });
  }
});