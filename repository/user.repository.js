const DB = require("../models");
const User = DB.User;

exports.findOrCreate = async (payload) => {
  try {
    const {
      user_id,
      give_bag,
      receive_bag,
      display_name
    } = payload;

    const user = await User.findOrCreate({
      where: { user_id },
      defaults: {
        give_bag,
        receive_bag,
        display_name
      }
    });

    return user[0].dataValues;
  } catch(e) {
    return {
      error: e
    };
  }
};
