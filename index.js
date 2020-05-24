const express     = require('express');
const app         = express();
const http        = require('http').Server(app);
const bodyParser  = require('body-parser');

const { SlackAdapter }   = require('botbuilder-adapter-slack');

const CONSTANTS = require('./constants');

const slackAdapter = new SlackAdapter(CONSTANTS.SLACK_APP_OPTIONS);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/messages', (req, res) => {
  slackAdapter.processActivity(req, res, async(context) => {
    console.log(context);
    // const viewData = {
    //   token: process.env.SLACK_BOT_TOKEN,
    //   trigger_id: context._activity.channelData.trigger_id,
    //   view: JSON.stringify({
    //     "type": "modal",
    //     "title": {
    //       "type": "plain_text",
    //       "text": "My App",
    //       "emoji": true
    //     },
    //     "submit": {
    //       "type": "plain_text",
    //       "text": "Submit",
    //       "emoji": true
    //     },
    //     "close": {
    //       "type": "plain_text",
    //       "text": "Cancel",
    //       "emoji": true
    //     },
    //     "blocks": [
    //       {
    //         "type": "input",
    //         "element": {
    //           "type": "plain_text_input",
    //           "action_id": "sl_input",
    //           "placeholder": {
    //             "type": "plain_text",
    //             "text": "Placeholder text for single-line input"
    //           }
    //         },
    //         "label": {
    //           "type": "plain_text",
    //           "text": "Label"
    //         },
    //         "hint": {
    //           "type": "plain_text",
    //           "text": "Hint text"
    //         }
    //       },
    //       {
    //         "type": "input",
    //         "element": {
    //           "type": "plain_text_input",
    //           "action_id": "ml_input",
    //           "multiline": true,
    //           "placeholder": {
    //             "type": "plain_text",
    //             "text": "Placeholder text for multi-line input"
    //           }
    //         },
    //         "label": {
    //           "type": "plain_text",
    //           "text": "Label"
    //         },
    //         "hint": {
    //           "type": "plain_text",
    //           "text": "Hint text"
    //         }
    //       }
    //     ]
    //   })
    // };

    // await context.sendActivity(DataView);
  });
});

http.listen(CONSTANTS.PORT, () => {
  console.log(`This app listen on port ${CONSTANTS.PORT}`);
});
