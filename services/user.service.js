const { WebClient } = require('@slack/web-api');

const CONSTANTS = require('../constants');
const web = new WebClient(CONSTANTS.SLACK_APP_OPTIONS.botToken);

const userRepository = require('../repository/user.repository');

const findOrCreate = async (userId) => {
  const param = { user: userId };
  const getSlackUserInfo = await web.users.info(param);
  const slackUserInfo = getSlackUserInfo.user;

  const data = {
    give_bag: 10,
    receive_bag: 0,
    user_id: slackUserInfo.id,
    display_name: slackUserInfo.profile.display_name
  };

  const user = await userRepository.findOrCreate(data);

  return user;
};

const updateUserBag = async (userIdRequest, userIdReceive, amount, message) => {
  return userRepository.updateUserBag(userIdRequest, userIdReceive, amount, message);
};

module.exports = {
  findOrCreate,
  updateUserBag
};
