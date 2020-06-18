const giftExchangeRepository = require('../repository/gift-exchange.repository.js');

const giftExchange = async (payload) => {
  // return await giftExchangeRepository.giftExchange(payload);
};

const giftExchangeList = async () => {
  return await giftExchangeRepository.giftExchangeList();
};

const giftExchangeStatus = async (payload) => {
  return await giftExchangeRepository.giftExchangeStatus(payload);
};

module.exports = {
  giftExchange,
  giftExchangeList,
  giftExchangeStatus
};
