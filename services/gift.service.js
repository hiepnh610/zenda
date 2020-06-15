const giftRepository = require('../repository/gift.repository');

const getGiftsList = async () => {
  return await giftRepository.getGiftsList();
};

const createGift = async (payload) => {
  return await giftRepository.createGift(payload);
};

const removeGift = async (id) => {
  return await giftRepository.removeGift(id);
};

module.exports = {
  getGiftsList,
  createGift,
  removeGift
};
