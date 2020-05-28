const User = require('../models/users');

const getUserInfo = (userId) => {
  const query = { user_id: userId };

  return User.findOne(query).exec();
};

const createUser = async (payload) => {
  const user = new User({
    avatar: payload.profile.image_512,
    display_name: payload.profile.display_name || '',
    email: payload.profile.email,
    give_bag: 20,
    real_name: payload.profile.real_name,
    receive_bag: 0,
    user_id: payload.id,
    user_name: payload.name
  });

  return await user.save();
};

const getOrCreate = async (payload) => {
  const query = { user_id: payload.id };
  const user = await User.findOne(query).exec();

  if (!user) {
    return createUser(payload);
  }

  return user;
};

const updateUser = async (fromUserId, toUserId, quantity) => {
  const fromUserQuery = { user_id: fromUserId };
  const toUserQuery = { user_id: toUserId };
  const decreaseFromUserPoints = await User.findOne(
    fromUserQuery,
    async (e, user) => {
      user.set({
        give_bag: user.give_bag - quantity
      });

      return await user.save();
    });

  if (decreaseFromUserPoints) {
    User.findOne(toUserQuery, async (e, user) => {
      user.set({
        receive_bag: user.receive_bag + quantity
      });

      return await user.save();
    });
  }

  return decreaseFromUserPoints;
};

module.exports = {
  getOrCreate,
  getUserInfo,
  updateUser
};
