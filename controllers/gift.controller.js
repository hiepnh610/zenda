const giftService = require('../services/gift.service');

const getGiftsList = async (req, res) => {
  const gifts = await giftService.getGiftsList();

  if (!gifts) {
    res.status(400).json({ message: 'Error happened.' });

    return;
  }

  if (gifts && gifts.error) {
    res.status(400).json({ message: gifts.error });

    return;
  }

  res.status(200).json(gifts);
};

const createGift = async (req, res) => {
  const payload = req.body.payload;

  if (!payload) {
    res.status(400).send({
      message: 'Cannot get gift information.'
    });

    return;
  }

  const gift = await giftService.createGift(payload);

  if (!gift) {
    res.status(400).json({ message: 'Error happened.' });

    return;
  }

  if (gift && gift.error) {
    res.status(400).json({ message: gift.error });

    return;
  }

  res.status(201).json(gift);
};

const updateGift = async (req, res) => {
  const id = req.params.id;
  const {
    name,
    image,
    quantity,
    points
  } = req.body;

  if (!id) {
    res.status(400).json({ message: 'Cannot get gift information.' });

    return;
  }

  if (!name) {
    res.status(400).json({ message: 'Cannot get name gift.' });

    return;
  }

  if (!image) {
    res.status(400).json({ message: 'Cannot get image gift.' });

    return;
  }

  if (!quantity) {
    res.status(400).json({ message: 'Cannot get quantity gift.' });

    return;
  }

  if (!points) {
    res.status(400).json({ message: 'Cannot get points gift.' });

    return;
  }

  const payload = {
    id,
    name,
    image,
    quantity,
    points
  };

  const gift = await giftService.updateGift(payload);

  if (gift && gift.error) {
    res.status(400).json({ message: gift.error });

    return;
  }

  res.status(200).json(gift);
};

const getGiftDetail = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    res.status(400).json({ message: 'Cannot get gift information.' });

    return;
  }

  const gift = await giftService.getGiftDetail(id);

  if (gift && gift.error) {
    res.status(400).json({ message: gift.error });

    return;
  }

  res.status(200).json(gift);
};

module.exports = {
  getGiftsList,
  createGift,
  updateGift,
  getGiftDetail
};
