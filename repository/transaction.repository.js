const DB = require("../models");
const User = DB.User;
const Transaction = DB.Transaction;

const getTransactionList = async () => {
  try {
    const transactions = await Transaction.findAndCountAll({
      limit: 5,
      offset: 0,
      order: [['updatedAt', 'DESC']]
    });

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

module.exports = {
  getTransactionList,
  removeTransaction
};
