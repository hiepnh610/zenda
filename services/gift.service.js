const giftRepository = require('../repository/gift.repository');

const getGiftsList = async (offset) => {
  return await giftRepository.getGiftsList(offset);
};

const createGift = async (payload) => {
  return await giftRepository.createGift(payload);
};

const updateGift = async (payload) => {
  return await giftRepository.updateGift(payload);
};

const getGiftDetail = async (id) => {
  return await giftRepository.getGiftDetail(id);
};

module.exports = {
  getGiftsList,
  createGift,
  updateGift,
  getGiftDetail
};
