const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GiftSchema = new Schema(
  {
    gift_name: {
      type: String,
      required: true
    },

    gift_image: {
      type: String
    },

    gift_link: {
      type: String,
      required: true
    },

    gift_points: {
      type: Number
    }
  },

  {
    timestamps: {
      createdAt: 'created_at'
    }
  }
);

const Gift = mongoose.model('Gift', GiftSchema);

module.exports = Gift;
