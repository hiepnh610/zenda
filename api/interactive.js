const { SlackAdapter } = require('botbuilder-adapter-slack');

const {
  getUserInfo,
  createUser
} = require('./users');
const { createTransaction } = require('./transactions');
const UTILS = require('../utils');
const CONSTANTS  = require('../constants');
const {
  giveTemplate,
  choiceTemplate,
  giftRequest
} = require('../templates');

const botAdapter = new SlackAdapter(CONSTANTS.SLACK_APP_OPTIONS);

const showModal = (context) => {
  const channelData = context._activity.channelData;
  const activityType = channelData.type;
  const modal = {
    "trigger_id": channelData.trigger_id
  }

  if (activityType === CONSTANTS.SHORTCUT) {
    modal.view = choiceTemplate;

    context._adapter.slack.views.open(modal);
  }

  if (activityType === CONSTANTS.VIEW_SUBMISSION) {
    const slackView = channelData.view;

    if (slackView) {
      const slackValues = slackView.state.values;
      const radioButtonValue = UTILS.findValue(slackValues, 'value');

      switch(radioButtonValue) {
        case CONSTANTS.RADIO_BUTTONS.GIVE:
          modal.view = giveTemplate;

          context._adapter.slack.views.open(modal);

          break;

        case CONSTANTS.RADIO_BUTTONS.GIFT_REQUEST:
          modal.view = giftRequest

          context._adapter.slack.views.open(modal);

          break;

        default:
      }
    }
  }
};

const handleFormData = (context) => {
  const channelData = context._activity.channelData;
  const slackView = channelData.view;

  if (slackView) {
    const cbId = slackView.callback_id;
    const slackValues = slackView.state.values;

    switch(cbId) {
      case CONSTANTS.MODAL_CALLBACK.GIVE:
        giveTheGift(context);

        break;

      case CONSTANTS.MODAL_CALLBACK.GIFT_REQUEST:
        console.log(slackValues);

        break;
    }
  }
};

const giveTheGift = async (context) => {
  const channelData = context._activity.channelData;
  const slackView = channelData.view;
  const fromUser = channelData.user;
  const slackValues = slackView.state.values;
  const selectedUser = UTILS.findValue(slackValues, 'selected_user');
  const quantityValue = UTILS.findValue(slackValues, 'value');
  const [
    fromUserInfo,
    toUserInfo
  ] = await getSlacksUserInfo(context, fromUser.id, selectedUser);

  checkUsersInDB(fromUserInfo, toUserInfo);

  // const payload = {
  //   from_id: fromUser.id,
  //   quantity: quantityValue,
  //   to_id: selectedUser
  // };
  // createTransaction(context, payload);
};

const getSlacksUserInfo = async (context, fromUserId, toUserId) => {
  return await Promise.all([
    getSlackUserInfo(context, fromUserId),
    getSlackUserInfo(context, toUserId)
  ]);
};

const checkBag = async (context) => {
  const channelData = await context._activity.channelData;
  const fromUser = channelData.user;
  const fromUserInfo = await getSlackUserInfo(context, fromUser.id);
  const fromUserInfoId = fromUserInfo.user.id;
  const slackUserInfo = await getUserInfo(fromUserInfoId);

  console.log(slackUserInfo);
};

const checkUsersInDB = async (toSlackUserId, fromSlackUserId) => {
  const isfromUserUnique = await getUserInfo(toSlackUserId);
  const isToUserUnique = await getUserInfo(fromSlackUserId);

  if (!isfromUserUnique) {
    createUser(fromUserInfo.user);
  }

  if (!isToUserUnique) {
    createUser(toUserInfo.user);
  }

  // checkBag(context);
};

const getSlackUserInfo = (context, userId) => {
  return context._adapter.slack.users.info({
    user: userId
  });
};

const handleInteractiveFromSlack = (req, res) => {
  botAdapter.processActivity(req, res, async(context) => {
    showModal(context);
    handleFormData(context);
  });
};

module.exports = {
  handleInteractiveFromSlack
};
