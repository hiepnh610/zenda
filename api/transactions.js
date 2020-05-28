const Transaction = require('../models/transactions');

const createTransaction = async (payload) => {
  const transaction = new Transaction(payload);

  return await transaction.save();
};

module.exports = {
  createTransaction
};
