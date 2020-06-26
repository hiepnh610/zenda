const { WebClient } = require('@slack/web-api');
const escapeHtml = require('escape-html');

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

const checkUserIsValid = async (userId) => {
  const userInfo = await slackUtil.user.getUserInfo(userId);

  if (userInfo.ok && userInfo.user) {
    if (userInfo.user.deleted) {
      return {
        error: CONSTANTS.SLACK_USER_STATUS.USER_DEACTIVATED
      }
    }

    if (userInfo.user.is_bot) {
      return {
        error: CONSTANTS.SLACK_USER_STATUS.USER_NOT_HUMAN
      }
    }

    return userInfo.user;
  }
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

  if (!amountIsInteger || pointsAmount <= 0) {
    setTimeout(() => {
      modal.view = generalTemplate(CONSTANTS.MESSAGES.POINT_IS_NAN);

      web.views.open(modal);
    }, 1000);

    return;
  }

  const getUserRequestInfo = await findOrCreate(userIdRequest);
  const checkUserRequestBag = checkBag(getUserRequestInfo, pointsAmount);

  if (!checkUserRequestBag) {
    setTimeout(() => {
      modal.view = generalTemplate(CONSTANTS.MESSAGES.OUT_OF_POINTS);

      web.views.open(modal);
    }, 1000);

    return;
  }

  const userIsValid = await checkUserIsValid(userIdReceive);

  if (userIsValid.error === CONSTANTS.SLACK_USER_STATUS.USER_DEACTIVATED) {
    setTimeout(() => {
      modal.view = generalTemplate(
        CONSTANTS.MESSAGES.NOT_GIVE_TO_DEACTIVATE_USER
      );

      web.views.open(modal);
    }, 1000);

    return;
  }

  if (userIsValid.error === CONSTANTS.SLACK_USER_STATUS.USER_NOT_HUMAN) {
    setTimeout(() => {
      modal.view = generalTemplate(CONSTANTS.MESSAGES.NOT_GIVE_TO_BOT);

      web.views.open(modal);
    }, 1000);

    return;
  }

  if (userIdRequest === userIdReceive) {
    setTimeout(() => {
      modal.view = generalTemplate(CONSTANTS.MESSAGES.NOT_GIVE_TO_SELF);

      web.views.open(modal);
    }, 1000);

    return;
  }

  await findOrCreate(userIdReceive);

  return {
    userIdRequest,
    userIdReceive,
    amount: pointsAmount,
    message: escapeHtml(userMessage)
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
  const message = `<@${userIdRequest}> đã đòi <@${userIdReceive}> *${pointsAmount}* bimbim. Với lời nhắn: \n>${userMessage}`;

  const amountIsInteger = Number.isInteger(pointsAmount);

  if (!amountIsInteger && pointsAmount <= 0) {
    setTimeout(() => {
      modal.view = generalTemplate(CONSTANTS.MESSAGES.POINT_IS_NAN);

      web.views.open(modal);
    }, 1000);

    return;
  }

  const dataToSendMessage = {
    user_request_id: userIdRequest,
    user_receive_id: userIdReceive,
    message
  };

  slackUtil.conversation.sendMessageToChannel(dataToSendMessage);
};

const getUserList = async () => {
  const users = await userRepository.getUserList();

  return users;
};

const updatePointsAllUser = async () => {
  const updateUsers = await userRepository.updatePointsAllUser();

  if (updateUsers && !updateUsers.error) {
    const payload = {
      message: `<!channel> Số lượng bimbim trong túi cho đã được reset.`
    };
    slackUtil.conversation.sendMessageToChannel(payload);
  }
};

const updateUserName = async () => {
  const getUserHasNotName = await userRepository.getUserHasNotName();

  if (getUserHasNotName.length) {
    getUserHasNotName.forEach(async (user) => {
      await setTimeout(async () => {
        const getUserInfo = await slackUtil.user.getUserInfo(user);

        await userRepository.updateUserName(getUserInfo.user);
      }, 2000);
    });
  }
};

module.exports = {
  findOrCreate,
  updateUserBag,
  giftClaim,
  getUserList,
  updatePointsAllUser,
  updateUserName
};
