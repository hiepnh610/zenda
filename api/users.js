const User = require('../models/users');

const getUserInfo = (userId) => {
  const query = { user_id: userId };

  return User.findOne(query).exec();
};

const createUser = (payload) => {
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

  user.save();
};

module.exports = {
  getUserInfo,
  createUser
};
