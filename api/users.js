const User = require('../models/users');

const findUnique = (userId) => {
  User.findOne({
    user_id: userId
  }, (e, user) => {
    console.log(user);
  });
};

module.exports = findUnique;
