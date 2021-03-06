const escapeHtml = require('escape-html');

const transactionRepository = require('../repository/transaction.repository');
const userRepository = require('../repository/user.repository');

const getTransactionList = async (offset, limit) => {
  const transactions = await transactionRepository.getTransactionList(offset, limit);
  const users = await userRepository.getUserList();

  const newRows = transactions.rows.map((transaction) => {
    let userData = {
      id: transaction.id,
      amount: transaction.amount,
      createdAt: transaction.createdAt,
      message: escapeHtml(transaction.message)
    };

    users.rows.forEach((user) => {
      if (user.user_id === transaction.user_request_id) {
        userData.user_request = user.display_name;
        userData.user_request_id = user.id;
      }

      if (user.user_id === transaction.user_receive_id) {
        userData.user_receive = user.display_name;
        userData.user_receive_id = user.id;
      }
    });

    return userData;
  });

  const response = {
    count: transactions.count,
    rows: newRows
  };

  return response;
};

const removeTransaction = async (transactionId) => {
  return await transactionRepository.removeTransaction(transactionId);
}

module.exports = {
  getTransactionList,
  removeTransaction
};
