const { app } = require('./app');
const routes = require('./routes');

app.listen(8088, () => {
  console.log('Server listening on port 8088');
});