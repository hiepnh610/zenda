const DB = require("../models");
const User = DB.User;
const Transaction = DB.Transaction;

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

const updateUserBag = async (userIdRequest, userIdReceive, amount, message) => {
  try {
    const userRequestQuery = { user_id: userIdRequest };
    const userReceiveQuery = { user_id: userIdReceive };

    return await DB.sequelize.transaction(async (transaction) => {
      const userRequestInfo = await User.findOne(
        { where: userRequestQuery },
        { transaction }
      );
      const userReceiveInfo = await User.findOne(
        { where: userReceiveQuery },
        { transaction }
      );

      await userRequestInfo.update(
        { give_bag: userRequestInfo.give_bag - amount },
        { transaction }
      );

      await userReceiveInfo.update(
        { receive_bag: userReceiveInfo.receive_bag + amount },
        { transaction }
      );

      return await Transaction.create(
        {
          user_request_id: userIdRequest,
          user_receive_id: userIdReceive,
          amount,
          message
        },
        { transaction }
      );
    });
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
