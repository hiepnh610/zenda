const { MONGODB_URI, MONGODB_OPTIONS } = require('./db');
const { PORT } = require('./port');
const { MESSAGES } = require('./messages');
const { SLACK_APP_OPTIONS } = require('./slack-options');
const {
  SHORTCUT,
  VIEW_SUBMISSION,
  MODAL_CALLBACK_ID,
  SHORT_CUT_CALLBACK_ID
} = require('./slack-callback');

module.exports = {
  MONGODB_URI,
  PORT,
  SHORTCUT,
  SLACK_APP_OPTIONS,
  VIEW_SUBMISSION,
  MODAL_CALLBACK_ID,
  MONGODB_OPTIONS,
  MESSAGES,
  SHORT_CUT_CALLBACK_ID
};
