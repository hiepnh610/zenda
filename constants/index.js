const { MONGODB_URI, MONGODB_OPTIONS } = require('./db');
const { PORT } = require('./port');
const { SLACK_APP_OPTIONS } = require('./slack-options');
const { SHORTCUT, VIEW_SUBMISSION } = require('./slack-interactive');
const { RADIO_BUTTONS, MODAL_CALLBACK } = require('./slack-block-kit');

module.exports = {
  MONGODB_URI,
  PORT,
  RADIO_BUTTONS,
  SHORTCUT,
  SLACK_APP_OPTIONS,
  VIEW_SUBMISSION,
  MODAL_CALLBACK,
  MONGODB_OPTIONS
};
