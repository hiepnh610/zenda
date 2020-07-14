const { PORT } = require('./port');
const { MESSAGES } = require('./messages');
const { SLACK_APP_OPTIONS } = require('./slack-options');
const { SLACK_USER_STATUS } = require('./slack-status');
const { SLACK_CHANNEL } = require('./slack-channel');
const {
  SHORTCUT,
  VIEW_SUBMISSION,
  MODAL_CALLBACK_ID,
  SHORT_CUT_CALLBACK_ID
} = require('./slack-callback');

module.exports = {
  PORT,
  SHORTCUT,
  SLACK_APP_OPTIONS,
  VIEW_SUBMISSION,
  MODAL_CALLBACK_ID,
  MESSAGES,
  SHORT_CUT_CALLBACK_ID,
  SLACK_USER_STATUS,
  SLACK_CHANNEL
};
