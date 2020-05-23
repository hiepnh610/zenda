const { PORT } = require('./port');
const { SLACK_APP_OPTIONS } = require('./slack-options');
const { MONGODB_URI } = require('./db');

module.exports = {
  PORT,
  SLACK_APP_OPTIONS,
  MONGODB_URI
};
