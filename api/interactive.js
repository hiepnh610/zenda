const { SlackAdapter } = require('botbuilder-adapter-slack');

const CONSTANTS  = require('../constants');
const UTILS = require('../utils');
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

          break;

        case CONSTANTS.RADIO_BUTTONS.GIFT_REQUEST:
          modal.view = giftRequest
          break;

        default:
      }

      context._adapter.slack.views.open(modal);
    }
  }
};

const handleFormData = (context) => {
  const channelData = context._activity.channelData;
  const slackView = channelData.view;
  const currentUser = channelData.user;

  // console.log(channelData);

  if (slackView) {
    const cbId = slackView.callback_id;
    const slackValues = slackView.state.values;

    switch(cbId) {
      case CONSTANTS.MODAL_CALLBACK.GIVE:
        const quantityValue = UTILS.findValue(slackValues, 'value');
        const selectedUser  = UTILS.findValue(slackValues, 'selected_user');

        const payload = {
          quantity: quantityValue,
          selectedUser: selectedUser
        };

        console.log(context);

        // const user = context._adapter.slack.users;

        break;

      case CONSTANTS.MODAL_CALLBACK.GIFT_REQUEST:
        console.log(slackValues);

        break;
    }
  }
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
