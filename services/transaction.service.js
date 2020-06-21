const escapeHtml = require('escape-html');

const transactionRepository = require('../repository/transaction.repository');
const userRepository = require('../repository/user.repository');

const getTransactionList = async () => {
  const transactions = await transactionRepository.getTransactionList();
  const users = await userRepository.getUserList();

  return transactions.map((transaction) => {
    let userData = {
      id: transaction.id,
      amount: transaction.amount,
      createdAt: transaction.createdAt,
      message: escapeHtml(transaction.message)
    };

    users.forEach((user) => {
      if (user.user_id === transaction.user_request_id) {
        userData.user_request = user.display_name;
      }

      if (user.user_id === transaction.user_receive_id) {
        userData.user_receive = user.display_name;
      }
    });

    return userData;
  });
};

const removeTransaction = async (transactionId) => {
  return await transactionRepository.removeTransaction(transactionId);
}

module.exports = {
  getTransactionList,
  removeTransaction
};
