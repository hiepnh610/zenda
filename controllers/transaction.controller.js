const transactionService = require('../services/transaction.service');

const getTransactionList = async (req, res) => {
  const transactions = await transactionService.getTransactionList();

  if (transactions && transactions.error) {
    res.status(400).json({ message: transactions.error });

    return;
  }

  res.status(200).json(transactions);
};

const removeTransaction = async (req, res) => {
  const transactionId = req.params.id;
  if (!transactionId) {
    res.status(400).json({ message: 'Cannot get transaction.' });
  }

  const transaction = await transactionService.removeTransaction(transactionId);

  if (!transaction) {
    res.status(400).json({ message: 'Cannot delete the transaction, please try again.' });
  }

  res.status(200).json({ message: 'Delete successfully.' });
};

module.exports = {
  getTransactionList,
  removeTransaction
};
