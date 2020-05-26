const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    avatar: {
      type: String
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    user_id: {
      type: String,
      required: true,
      unique: true
    },

    real_name: {
      type: String,
      required: true
    },

    give_bag: {
      type: Number,
      require: true
    },

    receive_bag: {
      type: Number,
      require: true
    }
  },

  { timestamps: { createdAt: 'created_at' } }
);

const User = mongoose.model('User', UserSchema);

module.exports = User;
