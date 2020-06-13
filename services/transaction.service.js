const transactionRepository = require('../repository/transaction.repository');

const getTransactionList = async () => {
  const transactions = await transactionRepository.getTransactionList();
  const usersId = [];

  transactions.forEach((transaction) => {
    if (!usersId.length) {
      usersId.push(transaction.user_request_id, transaction.user_receive_id);
    } else {
      usersId.forEach((user) => {
        console.log('user', user);
      });
    }
  });

  return transactions;
};

module.exports = {
  getTransactionList
};
