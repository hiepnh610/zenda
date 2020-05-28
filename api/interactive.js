const { SlackAdapter } = require('botbuilder-adapter-slack');

const {
  getOrCreate,
  updateUser
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
  const quantityValue = parseInt(UTILS.findValue(slackValues, 'value'));
  const isIntNumber = Number.isInteger(quantityValue);
  const [
    fromUserInfo,
    toUserInfo
  ] = await getSlacksUserInfo(context, fromUser.id, selectedUser);
  const getFromUserInfo = await getOrCreate(fromUserInfo.user);

  const bagIsValid = await checkBag(getFromUserInfo, quantityValue);

  getOrCreate(toUserInfo.user);

  if (bagIsValid && isIntNumber) {
    const userUpdated = await updateUser(
      fromUserInfo.user.id,
      toUserInfo.user.id,
      quantityValue
    );

    if (userUpdated) {
      const payload = {
        from_user_id: fromUserInfo.user.id,
        quantity: quantityValue,
        to_user_id: toUserInfo.user.id
      };

      const transCreated = await createTransaction(payload);

      if (transCreated) {
        console.log(context);
      }
    }
  }
};

const getSlacksUserInfo = async (context, fromUserId, toUserId) => {
  return await Promise.all([
    getSlackUserInfo(context, fromUserId),
    getSlackUserInfo(context, toUserId)
  ]);
};

const checkBag = async (fromUserInfo, quantity) => {
  const giveBag = fromUserInfo.give_bag;

  if (giveBag > 0 && giveBag >= quantity) {
    return true;
  }
};

const getSlackUserInfo = (context, userId) => {
  return context._adapter.slack.users.info({
    user: userId
  });
};

const handleInteractiveFromSlack = (req, res) => {
  botAdapter.processActivity(req, res, (context) => {
    showModal(context);
    handleFormData(context);
  });
};

module.exports = {
  handleInteractiveFromSlack
};
