const { WebClient } = require('@slack/web-api');

const CONSTANTS  = require('../constants');

const web = new WebClient(CONSTANTS.SLACK_APP_OPTIONS.botToken);

const getUserInfo = async (userId) => {
  const query = { user: userId };
  const userInfo = await web.users.info(query);
  return userInfo;
};

const checkUserIsValid = async (userId) => {
  const userInfo = await getUserInfo(userId);

  if (userInfo.ok && userInfo.user) {
    if (userInfo.user.deleted) {
      return {
        error: CONSTANTS.SLACK_USER_STATUS.USER_DEACTIVATED
      }
    }

    if (userInfo.user.is_bot) {
      return {
        error: CONSTANTS.SLACK_USER_STATUS.USER_NOT_HUMAN
      }
    }

    return userInfo.user;
  }
};

module.exports = {
  getUserInfo,
  checkUserIsValid
};
