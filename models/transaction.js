'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    user_request_id: DataTypes.STRING,
    user_receive_id: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    message: DataTypes.STRING
  }, {});
  Transaction.associate = function(models) {
    // associations can be defined here
  };
  return Transaction;
};