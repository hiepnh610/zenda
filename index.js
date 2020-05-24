const express     = require('express');
const app         = express();
const http        = require('http').Server(app);
const bodyParser  = require('body-parser');

const { SlackAdapter }   = require('botbuilder-adapter-slack');

const CONSTANTS = require('./constants');
const { giveTemplate } = require('./templates');

const botAdapter = new SlackAdapter(CONSTANTS.SLACK_APP_OPTIONS);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/shortcut', (req, res) => {
  botAdapter.processActivity(req, res, async(context) => {
    const modal = {
      "trigger_id": context._activity.channelData.trigger_id,
      "view": giveTemplate
    };

    context._adapter.slack.views.open(modal);
  });
});

http.listen(CONSTANTS.PORT, () => {
  console.log(`This app listen on port ${CONSTANTS.PORT}`);
});
