const Gift = require('../models/gifts');

const createGift = (data) => {
  if (data) {
    const gift = new Gift(data);

    return gift.save();
  }
};

module.exports = {
  createGift
};
