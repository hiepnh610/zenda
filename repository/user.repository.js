const DB = require("../models");
const User = DB.User;

const findOrCreate = async (payload) => {
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

const updateUserBag = async (userIdRequest, userIdReceive, quantity) => {
  try {
    const userRequestQuery = { user_id: userIdRequest };
    const userReceiveQuery = { user_id: userIdReceive };

    const result = await DB.sequelize.transaction(async (transaction) => {
      const userRequestInfo = await User.findOne(
        { where: userRequestQuery }
      );
      const userReceiveInfo = await User.findOne(
        { where: userReceiveQuery }
      );

      await userRequestInfo.update({
        give_bag: userRequestInfo.give_bag - quantity
      }, { transaction });

      await userReceiveInfo.update({
        receive_bag: userReceiveInfo.receive_bag + quantity
      }, { transaction });

      return Promise.all([
        userRequestInfo,
        userReceiveInfo
      ]);
    });

    return result;
  } catch (e) {
    return {
      error: e
    };
  }
};

module.exports = {
  findOrCreate,
  updateUserBag
};
