const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema(
  {
    from_id: {
      type: String,
      required: true
    },

    to_id: {
      type: String,
      required: true
    },

    quantity: {
      type: Number,
      required: true
    }
  },

  { timestamps: { createdAt: 'created_at' } }
);

const Transaction = mongoose.model('Transaction', TransactionSchema);

module.exports = Transaction;
