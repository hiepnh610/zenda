const { Op } = require("sequelize");
const moment = require('moment');

const DB = require("../models");
const User = DB.User;
const Transaction = DB.Transaction;

const getTransactionList = async (offset) => {
  let query = {};

  if (offset) {
    query = {
      limit: 5,
      offset: parseInt(offset),
      order: [['updatedAt', 'DESC']]
    };
  }

  try {
    const transactions = await Transaction.findAndCountAll(query);

    return transactions;
  } catch (error) {
    return { error };
  };
};

const removeTransaction = async (transactionId) => {
  try {
    return await DB.sequelize.transaction(async (transaction) => {
      const transactionQuery = { id: transactionId  };

      const getTransactionInfo = await Transaction.findOne(
        { where: transactionQuery },
        { transaction }
      );

      const userQuery = { user_id: getTransactionInfo.user_receive_id };

      const userReceiveInfo = await User.findOne(
        { where: userQuery },
        { transaction }
      );

      await Transaction.destroy({
        where: { id: transactionId }
      }, { transaction });

      await userReceiveInfo.update(
        { receive_bag: userReceiveInfo.receive_bag - getTransactionInfo.amount },
        { transaction }
      );

      return {
        message: 'Delete successfully.'
      };
    });
  } catch (error) {
    return { error };
  };
};

const getTopGivePointsUser = async () => {
  try {
    const dateFormat = 'YYYY-MM-DD HH:mm:ss';
    const startOfMonth = moment().startOf('month').format(dateFormat);
    const endOfMonth   = moment().endOf('month').format(dateFormat);

    const query = {
      where: {
        createdAt: {
          [Op.gte]: startOfMonth,
          [Op.lte]: endOfMonth
        }
      }
    };

    const transactions = await Transaction.findAll(query);

    return transactions;
  } catch (error) {
    return { error };
  };
};

module.exports = {
  getTransactionList,
  removeTransaction,
  getTopGivePointsUser
};
