const transactionService = require('../services/transaction.service');

const getTransactionList = async (req, res) => {
  const transactions = await transactionService.getTransactionList();

  if (transactions && transactions.error) {
    res.status(400).json({ message: transactions.error });

    return;
  }

  res.status(200).json(transactions);
};

module.exports = {
  getTransactionList
};
