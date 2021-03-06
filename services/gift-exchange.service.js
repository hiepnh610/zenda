const { WebClient } = require('@slack/web-api');

const userRepository = require('../repository/user.repository');
const giftRepository = require('../repository/gift.repository');
const giftExchangeRepository = require('../repository/gift-exchange.repository.js');

const slackUtil = require('../slack-utils');
const UTILS = require('../utils');
const CONSTANTS = require('../constants');

const { generalTemplate } = require('../templates');

const web = new WebClient(CONSTANTS.SLACK_APP_OPTIONS.botToken);

const giftExchange = async (payload) => {
  const modal = {
    "trigger_id": payload.trigger_id
  };
  const slackView = payload.view;
  const valuesRequest = slackView.state.values;
  const selectedOption = UTILS.findValue(valuesRequest, 'gift_exchange');

  if (!selectedOption) {
    return { error: 'Cannot get gift amount.' }
  }

  const userId = payload.user.id;
  const selectedValue = selectedOption.selected_option.value;
  const userInfo = await userRepository.getUserInfo({ user_id: userId });
  const giftInfo = await giftRepository.getGiftDetail(selectedValue);

  if (!userInfo) {
    return { message: 'Cannot get user information.' };
  }

  if (!giftInfo) {
    return { message: 'Cannot get gift information.' };
  }

  const receivePoints = userInfo.receive_bag;
  const giftPoints = giftInfo.points;

  if (receivePoints < giftPoints) {
    setTimeout(() => {
      modal.view = generalTemplate(CONSTANTS.MESSAGES.NOT_EXCHANGE_GIFT);

      web.views.open(modal);
    }, 1000);

    return;
  }

  const data = {
    user_id: userId,
    gift_id: selectedValue
  };

  const giftExchangeData = await giftExchangeRepository.giftExchange(data);

  if (giftExchangeData && !giftExchangeData.error) {
    const dataToSendMessage = {
      user_request_id: userId,
      message: `<@${userId}> đã gửi yêu cầu đổi món quà là ${giftInfo.name}.`,
      notification: `<@${userId}> đã gửi yêu cầu đổi món quà là ${giftInfo.name}.`
    };

    setTimeout(() => {
      modal.view = generalTemplate(CONSTANTS.MESSAGES.GIFT_EXCHANGE_SUCCESSFULLY);

      slackUtil.conversation.sendMessageToChannel(dataToSendMessage);

      web.views.open(modal);
    }, 1000);
  }
};

const giftExchangeList = async (offset, limit) => {
  const exchanges = await giftExchangeRepository.giftExchangeList(offset, limit);
  const users = await userRepository.getUserList();

  const newRows = exchanges.rows.map((exchange) => {
    const {
      id,
      display_name,
      gift_name,
      status,
      createdAt,
      updatedAt,
      user_request_id
    } = exchange;

    let exchangeData = {
      id,
      display_name,
      gift_name,
      status,
      createdAt,
      updatedAt,
    };

    users.rows.forEach((user) => {
      if (user.user_id === user_request_id) {
        exchangeData.user_request_id = user.id;
      }
    });

    return exchangeData;
  });

  const response = {
    count: exchanges.count,
    rows: newRows
  };

  return response;
};

const giftExchangeStatus = async (payload) => {
  return await giftExchangeRepository.giftExchangeStatus(payload);
};

const removeGiftExchange = async (id) => {
  return await giftExchangeRepository.removeGiftExchange(id);
};

module.exports = {
  giftExchange,
  giftExchangeList,
  giftExchangeStatus,
  removeGiftExchange
};
