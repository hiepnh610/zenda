const sequelize = require('sequelize');

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
  let transaction;

  try {
    transaction = await sequelize.transaction();
    const userRequestQuery = { user_id: userIdRequest };
    const userReceiveQuery = { user_id: userIdReceive };

    await User
      .findOne({ where: userRequestQuery })
      .then((user) => {
        console.log('userIdRequest', user);
        if (user) {
          return user.update({
            give_bag: user.give_bag - quantity
          }, transaction);
        }
      });

    await User
      .findOne({ where: userReceiveQuery })
      .then((user) => {
        console.log('userIdReceive', user);
        if (user) {
          return user.update({
            receive_bag: user.receive_bag + quantity
          }, transaction);
        }
      });

    await transaction.commit();
  } catch (e) {
    if (transaction) await transaction.rollback();

    return {
      error: e
    };
  }
};

module.exports = {
  findOrCreate,
  updateUserBag
};
