const { WebClient } = require('@slack/web-api');

const CONSTANTS  = require('../constants');

const web = new WebClient(CONSTANTS.SLACK_APP_OPTIONS.botToken);

const checkUserIsActive = async (userId) => {
  const query = { user: userId };
  const userInfo = await web.users.info(query);

  if (userInfo.ok && userInfo.user) {
    return !!(userInfo.user.deleted);
  }
};

const checkUserIsHuman = async (userId) => {
  const query = { user: userId };
  const userInfo = await web.users.info(query);

  if (userInfo.ok && userInfo.user) {
    return !!(userInfo.user.is_bot);
  }
};

module.exports = {
  checkUserIsActive,
  checkUserIsHuman
};
