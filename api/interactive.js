const { SlackAdapter } = require('botbuilder-adapter-slack');

const CONSTANTS  = require('../constants');
const UTILS = require('../utils');
const {
  giveTemplate,
  choiceTemplate,
  giftRequest
} = require('../templates');

const botAdapter = new SlackAdapter(CONSTANTS.SLACK_APP_OPTIONS);

const handleInteractiveFromSlack = (req, res) => {
  botAdapter.processActivity(req, res, async(context) => {
    const activityType = context._activity.channelData.type;
    const modal = {
      "trigger_id": context._activity.channelData.trigger_id
    }

    if (activityType === CONSTANTS.SHORTCUT) {
      modal.view = choiceTemplate;

      context._adapter.slack.views.open(modal);
    }

    if (activityType === CONSTANTS.VIEW_SUBMISSION) {
      if (context._activity.channelData.view) {
        const values = context._activity.channelData.view.state.values;
        const radioValue = UTILS.findValue(values, 'value');

        switch(radioValue) {
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
  });
};

module.exports = {
  handleInteractiveFromSlack
};
