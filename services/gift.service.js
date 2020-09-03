const giftRepository = require('../repository/gift.repository');

const getGiftsList = async (offset, limit) => {
  return await giftRepository.getGiftsList(offset, limit);
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
