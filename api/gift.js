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

const deleteGift = (req, res) => {
  const giftId = req.params.id;

  if (giftId) {
    const query = { '_id': giftId };

    Gift.deleteOne(query, (e) => {
      if (e) return res.status(400).send(e);

      res.status(200).json({ message: 'Gift deleted.' });
    });
  }
};

module.exports = {
  createGift,
  getGifts,
  deleteGift
};
