const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema(
  {
    user_request_id: {
      type: String,
      required: true
    },

    user_receive_id: {
      type: String,
      required: true
    },

    quantity: {
      type: Number,
      required: true
    },

    text: {
      type: String,
      required: true
    }
  },

  { timestamps: { createdAt: 'created_at' } }
);

const Transaction = mongoose.model('Transaction', TransactionSchema);

module.exports = Transaction;
