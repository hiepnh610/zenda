const UTILS = require('../utils');

const giftExchangeRepository = require('../repository/gift-exchange.repository.js');

const giftExchange = async (payload) => {
  const slackView = payload.view;
  const valuesRequest = slackView.state.values;
  const selectedOption = UTILS.findValue(valuesRequest, 'gift_exchange');

  if (selectedOption) {
    const selectedValue = selectedOption.selected_option.value;

    console.log('selectedValue', selectedValue);
  }
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
