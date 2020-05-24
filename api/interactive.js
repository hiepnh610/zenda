const { SlackAdapter } = require('botbuilder-adapter-slack');

const CONSTANTS  = require('../constants');
const {
  giveTemplate,
  choiceTemplate
} = require('../templates');

const botAdapter = new SlackAdapter(CONSTANTS.SLACK_APP_OPTIONS);

const handleInteractiveFromSlack = (req, res) => {
  botAdapter.processActivity(req, res, async(context) => {
    const activityType = context._activity.channelData.type;
    const modal = {
      "trigger_id": context._activity.channelData.trigger_id
    }

    if (activityType === 'shortcut') {
      modal.view = choiceTemplate;

      context._adapter.slack.views.open(modal);
    }

    if (activityType === 'view_submission') {
      modal.view = giveTemplate;

      context._adapter.slack.views.open(modal);
    }
  });
};

module.exports = {
  handleInteractiveFromSlack
};
