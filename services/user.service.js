const { WebClient } = require('@slack/web-api');

const CONSTANTS = require('../constants');
const web = new WebClient(CONSTANTS.SLACK_APP_OPTIONS.botToken);

const UTILS = require('../utils');
const userRepository = require('../repository/user.repository');
const slackUtil = require('../slack-utils');

const { generalTemplate } = require('../templates');

const findOrCreate = async (userId) => {
  const getSlackUserInfo = await slackUtil.user.getUserInfo(userId);
  const slackUserInfo = getSlackUserInfo.user;

  const data = {
    give_bag: 10,
    receive_bag: 0,
    user_id: slackUserInfo.id,
    display_name: slackUserInfo.profile.display_name
  };

  const user = await userRepository.findOrCreate(data);

  return user;
};

const checkBag = (userInfo, amount) => {
  const giveBag = userInfo.give_bag;

  return (giveBag > 0 && giveBag >= amount);
};

const giveTheGift = async (payload) => {
  const modal = {
    "trigger_id": payload.trigger_id
  };
  const slackView = payload.view;

  const userRequest = payload.user;
  const userIdRequest = userRequest.id;

  const valuesRequest = slackView.state.values;

  const userIdReceive = UTILS.findValue(valuesRequest, 'user_receive').selected_user;
  const pointsAmount = parseInt(UTILS.findValue(valuesRequest, 'amount').value);
  const userMessage = UTILS.findValue(valuesRequest, 'message').value;

  const amountIsInteger = Number.isInteger(pointsAmount);

  if (!amountIsInteger) {
    modal.view = generalTemplate(CONSTANTS.MESSAGES.POINT_IS_NAN);

    web.views.open(modal);

    return;
  }

  const getUserRequestInfo = await findOrCreate(userIdRequest);
  const checkUserRequestBag = checkBag(getUserRequestInfo, pointsAmount);

  if (!checkUserRequestBag) {
    modal.view = generalTemplate(CONSTANTS.MESSAGES.OUT_OF_POINTS);

    web.views.open(modal);

    return;
  }

  const checkUserIsValid = await slackUtil.user.checkUserIsValid(userIdReceive);

  if (checkUserIsValid.error === CONSTANTS.SLACK_USER_STATUS.USER_DEACTIVATED) {
    modal.view = generalTemplate(
      CONSTANTS.MESSAGES.NOT_GIVE_TO_DEACTIVATE_USER
    );

    web.views.open(modal);

    return;
  }

  if (checkUserIsValid.error === CONSTANTS.SLACK_USER_STATUS.USER_NOT_HUMAN) {
    modal.view = generalTemplate(CONSTANTS.MESSAGES.NOT_GIVE_TO_BOT);

    web.views.open(modal);

    return;
  }

  if (userIdRequest === userIdReceive) {
    modal.view = generalTemplate(CONSTANTS.MESSAGES.NOT_GIVE_TO_SELF);

    web.views.open(modal);

    return;
  }

  await findOrCreate(userIdReceive);

  return {
    userIdRequest,
    userIdReceive,
    amount: pointsAmount,
    message: userMessage
  };
};

const updateUserBag = async (payload) => {
  const giveData = await giveTheGift(payload);

  if (giveData) {
    const giftTransaction = await userRepository.updateUserBag(giveData);

    if (giftTransaction) {
      const {
        user_request_id,
        user_receive_id,
        amount
      } = giftTransaction;
      const userMessage = giftTransaction.message;
      const message = `<@${user_request_id}> đã gửi tặng <@${user_receive_id}> *${amount}* bimbim. Với lời nhắn: \n>${userMessage}`;

      const dataToSendMessage = {
        user_request_id,
        user_receive_id,
        message
      };

      slackUtil.conversation.sendMessageToChannel(dataToSendMessage);
    }

    return giftTransaction;
  }
};

const giftClaim = (payload) => {
  const slackView = payload.view;
  const userRequest = payload.user;
  const userIdRequest = userRequest.id;
  const valuesRequest = slackView.state.values;
  const userIdReceive = UTILS.findValue(valuesRequest, 'user_receive').selected_user;
  const pointsAmount = parseInt(UTILS.findValue(valuesRequest, 'amount').value);
  const userMessage = UTILS.findValue(valuesRequest, 'message').value;
  const message = `<@${userIdRequest}> đã đòi <@${userIdReceive}> *${pointsAmount}* bimbim. Với lời nhắn: \n>${userMessage}`;

  const dataToSendMessage = {
    user_request_id: userIdRequest,
    user_receive_id: userIdReceive,
    message
  };

  slackUtil.conversation.sendMessageToChannel(dataToSendMessage);
};

module.exports = {
  findOrCreate,
  updateUserBag,
  giftClaim
};
