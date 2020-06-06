const DB = require("../models");
const User = DB.User;

exports.create = async (payload) => {
  try {
    const user = await User.create(payload);

    return user.dataValues;
  } catch(e) {
    return {
      error: e
    };
  }
};
