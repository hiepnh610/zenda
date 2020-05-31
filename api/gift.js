const Gift = require('../models/gifts');

const createGift = (data) => {
  if (data) {
    const gift = new Gift(data);

    return gift.save();
  }
};

const getGifts = (req, res) => {
  Gift
    .find({})
    .exec((e, gifts) => {
      if (e) {
        return res.status(400).send(e);
      }

      if (gifts) {
        res.status(200).json(gifts);
      }
    });
};

module.exports = {
  createGift,
  getGifts
};
