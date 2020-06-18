const exchangeRepository = require('../repository/exchange.repository.js');

const giftExchange = async (payload) => {
  return await exchangeRepository.giftExchange(payload);
};

module.exports = {
  giftExchange
};
