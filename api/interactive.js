const { SlackAdapter } = require('botbuilder-adapter-slack');

const {
  findUnique,
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
        // console.log(slackValues);

        break;
    }
  }
};

const giveTheGift = (context) => {
  const channelData = context._activity.channelData;
  const slackView = channelData.view;
  const currentUser = channelData.user;
  const slackValues = slackView.state.values;
  const selectedUser = UTILS.findValue(slackValues, 'selected_user');
  const quantityValue = UTILS.findValue(slackValues, 'value');

  const payload = {
    from_id: currentUser.id,
    quantity: quantityValue,
    to_id: selectedUser
  };

  checkUsersInDB(context);
  createTransaction(context, payload);
};

const checkUsersInDB = async (context) => {
  const channelData = context._activity.channelData;
  const slackView = channelData.view;
  const currentUser = channelData.user;
  const slackValues = slackView.state.values;
  const selectedUser = UTILS.findValue(slackValues, 'selected_user');

  const [currentUserInfo, targetUserInfo] = await Promise.all([
    getUserInfo(context, currentUser.id),
    getUserInfo(context, selectedUser)
  ]);

  const isCurrentUserUnique = await findUnique(currentUser.id);
  const isTargetUserUnique = await findUnique(currentUser.id);

  if (!isCurrentUserUnique) {
    createUser(currentUserInfo.user);
  }

  if (!isTargetUserUnique) {
    createUser(targetUserInfo.user);
  }
};

const getUserInfo = (context, userId) => {
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
