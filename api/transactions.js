const Transaction = require('../models/transactions');

const createTransaction = (context, payload) => {
  const transaction = new Transaction({
    from_id: payload.from_id,
    quantity: payload.quantity,
    to_id: payload.to_id
  });

  transaction.save();
};

module.exports = {
  createTransaction
};
