const { WebClient } = require('@slack/web-api');

const CONSTANTS = require('../constants');
const web = new WebClient(CONSTANTS.SLACK_APP_OPTIONS.botToken);

const userRepository = require('../repository/user.repository');

exports.findOrCreate = async (userId) => {
  const param = { user: userId };
  const getSlackUserInfo = await web.users.info(param);
  const slackUserInfo = getSlackUserInfo.user;

  const user = {
    give_bag: 10,
    receive_bag: 0,
    user_id: slackUserInfo.id,
    display_name: slackUserInfo.profile.display_name
  };

  const data = await userRepository.findOrCreate(user);

  return data;
};

exports.updateUserBag = async (userIdRequest, userIdReceive, quantity) => {};
