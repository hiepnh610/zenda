const { WebClient } = require('@slack/web-api');

const CONSTANTS  = require('../constants');

const web = new WebClient(CONSTANTS.SLACK_APP_OPTIONS.botToken);

const getUserInfo = async (userId) => {
  const query = { user: userId };
  const userInfo = await web.users.info(query);
  return userInfo;
};

module.exports = {
  getUserInfo
};
