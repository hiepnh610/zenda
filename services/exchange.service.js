const exchangeRepository = require('../repository/exchange.repository.js');

const giftExchange = async (payload) => {
  return await exchangeRepository.giftExchange(payload);
};

const exchangeList = async () => {
  return await exchangeRepository.exchangeList();
};

const exchangeStatus = async (payload) => {
  return await exchangeRepository.exchangeStatus(payload);
};

module.exports = {
  giftExchange,
  exchangeList,
  exchangeStatus
};
