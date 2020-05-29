const { WebClient } = require('@slack/web-api');

const User = require('../models/users');
const CONSTANTS = require('../constants');

const web = new WebClient(CONSTANTS.SLACK_APP_OPTIONS.botToken);

const getUserInfo = (userId) => {
  const query = { user_id: userId };

  return User.findOne(query).exec();
};

const createUser = async (userId) => {
  const param = { user: userId };
  const getSlackUserInfo = await web.users.info(param);
  const slackUserInfo = getSlackUserInfo.user;

  const user = new User({
    avatar: slackUserInfo.profile.image_512,
    display_name: slackUserInfo.profile.display_name || '',
    email: slackUserInfo.profile.email,
    give_bag: 20,
    real_name: slackUserInfo.profile.real_name,
    receive_bag: 0,
    user_id: slackUserInfo.id,
    user_name: slackUserInfo.name
  });

  return user.save();
};

const getOrCreate = async (userId) => {
  const query = { user_id: userId };
  const user = await User.findOne(query).exec();

  if (!user) {
    return createUser(userId);
  }

  return user;
};

const updateUser = async (userIdRequest, userIdReceive, quantity) => {
  const getUserReceiveInfo = await getOrCreate(userIdReceive);

  if (getUserReceiveInfo) {
    const userRequestQuery = { user_id: userIdRequest };
    const userReceiveQuery = { user_id: userIdReceive };
    const isUserRequestDecreased = await decreasePointsUserRequest(
      userRequestQuery,
      quantity
    );
    const isUserReceiveIncreased =
      isUserRequestDecreased ?
      await increasePointsUserReceive(userReceiveQuery, quantity) :
      null;

    if (isUserRequestDecreased && isUserReceiveIncreased) {
      return {
        user_request_id: userIdRequest,
        user_receive_id: userIdReceive,
        quantity: quantity
      };
    }
  }
};

const decreasePointsUserRequest = (userRequestQuery, quantity) => {
  return User.findOne(
    userRequestQuery,
    (e, user) => {
      user.set({
        give_bag: user.give_bag - quantity
      });

      return user.save();
    }
  );
};

const increasePointsUserReceive = (userReceiveQuery, quantity) => {
  return User.findOne(
    userReceiveQuery,
    (e, user) => {
      user.set({
        receive_bag: user.receive_bag + quantity
      });

      return user.save();
    }
  );
};

module.exports = {
  getOrCreate,
  getUserInfo,
  updateUser
};
