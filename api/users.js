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
    give_bag: 10,
    receive_bag: 0,
    user_id: slackUserInfo.id
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

const getUserList = async (req, res) => {
  User
    .find({})
    .select('user_id give_bag receive_bag -_id')
    .exec(async (e, users) => {
      if (e) return res.status(400).send(e);

      if (users) {
        const usersInSlackInfo = await web.users.list();

        if (usersInSlackInfo.ok && usersInSlackInfo.members) {
          const mergeUserInfo = users.flatMap((user) => {
            return usersInSlackInfo.members.map((member) => {
              if (user.user_id === member.id) {
                return {
                  display_name: member.profile.display_name,
                  give_bag: user.give_bag,
                  receive_bag: user.receive_bag
                }
              }
            });
          });

          const filterData = mergeUserInfo.filter(data => data != null);

          res.status(200).json(filterData);
        }
      }
    });
};

module.exports = {
  getOrCreate,
  getUserInfo,
  updateUser,
  getUserList
};
