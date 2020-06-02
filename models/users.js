const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
      unique: true
    },

    give_bag: {
      type: Number,
      require: true
    },

    receive_bag: {
      type: Number,
      require: true
    },

    display_name: {
      type: String,
      required: true
    },

    display_name: {
      type: String,
      required: true
    }
  },

  { timestamps: { createdAt: 'created_at' } }
);

const User = mongoose.model('User', UserSchema);

module.exports = User;
