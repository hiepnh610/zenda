const DB = require("../models");
const Transaction = DB.Transaction;

const getTransactionList = async () => {
  try {
    const transactions = await Transaction.findAll();

    return transactions;
  } catch (error) {
    return { error };
  }
};

module.exports = {
  getTransactionList
};
