const { MONGODB_URI } = require('./db');
const { PORT } = require('./port');
const { SLACK_APP_OPTIONS } = require('./slack-options');
const { SHORTCUT, VIEW_SUBMISSION } = require('./slack-interactive');
const { RADIO_BUTTONS } = require('./slack-block-kit');

module.exports = {
  MONGODB_URI,
  PORT,
  RADIO_BUTTONS,
  SHORTCUT,
  SLACK_APP_OPTIONS,
  VIEW_SUBMISSION
};
