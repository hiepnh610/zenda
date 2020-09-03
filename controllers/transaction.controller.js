const perf = require('execution-time')();

const transactionService = require('../services/transaction.service');
const UTILS = require('../utils');

const getTransactionList = async (req, res) => {
  perf.start('apiCall');

  const logData = {};
  const offset = req.query.offset;
  const limit = req.query.limit;

  if (!offset) {
    const message = 'Offset cannot be empty.';

    logData.execution_time = perf.stop('apiCall').words;
    logData.msg = message;

    UTILS.logging.error(req, logData);

    return res.status(400).json({ message: 'Offset cannot be empty.' });
  }

  if (!limit) {
    const message = 'Limit cannot be empty.';

    logData.execution_time = perf.stop('apiCall').words;
    logData.msg = message;

    UTILS.logging.error(req, logData);

    return res.status(400).json({ message: 'Limit cannot be empty.' });
  }

  const transactions = await transactionService.getTransactionList(offset, limit);

  if (transactions && transactions.error) {
    logData.execution_time = perf.stop('apiCall').words;
    logData.msg = transactions.error;

    UTILS.logging.error(req, logData);

    res.status(400).json({ message: transactions.error });

    return;
  }

  logData.execution_time = perf.stop('apiCall').words;
  logData.msg = "Get transactions list successfully.";

  UTILS.logging.info(req, logData);

  res.status(200).json(transactions);
};

const removeTransaction = async (req, res) => {
  perf.start('apiCall');

  const logData = {};
  const transactionId = req.params.id;
  if (!transactionId) {
    logData.execution_time = perf.stop('apiCall').words;
    logData.msg = 'Cannot get transaction.';

    UTILS.logging.error(req, logData);

    res.status(400).json({ message: 'Cannot get transaction.' });
  }

  const transaction = await transactionService.removeTransaction(transactionId);

  if (!transaction) {
    logData.execution_time = perf.stop('apiCall').words;
    logData.msg = 'Cannot delete the transaction.';

    UTILS.logging.error(req, logData);

    res.status(400).json({ message: 'Cannot delete the transaction.' });
  }

  logData.execution_time = perf.stop('apiCall').words;
  logData.msg = 'Delete transaction successfully.';

  UTILS.logging.info(req, logData);

  res.status(200).json({ message: 'Delete transaction successfully.' });
};

module.exports = {
  getTransactionList,
  removeTransaction
};
