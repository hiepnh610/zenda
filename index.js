const express     = require('express');
const app         = express();
const http        = require('http').Server(app);
const axios       = require('axios');
const bodyParser  = require('body-parser');
const qs = require('qs');

const { SlackAdapter }   = require('botbuilder-adapter-slack');

const CONSTANTS = require('./constants');

const slackAdapter = new SlackAdapter(CONSTANTS.SLACK_APP_OPTIONS);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/messages', (req, res) => {
  slackAdapter.processActivity(req, res, async(context) => {
    console.log('context', context);

    const viewData = {
      token: process.env.SLACK_BOT_TOKEN,
      trigger_id: context._activity.channelData.trigger_id,
      view: JSON.stringify({
        type: 'modal',
        title: {
          type: 'plain_text',
          text: 'Save it to ClipIt!'
        },
        callback_id: 'bimbim_give_modal',
        submit: {
          type: 'plain_text',
          text: 'ClipIt'
        },
        blocks: [
          {
            block_id: 'message',
            type: 'input',
            element: {
              action_id: 'message_id',
              type: 'plain_text_input',
              multiline: true,
              initial_value: 'test'
            },
            label: {
              type: 'plain_text',
              text: 'Message Text'
            }
          },
          {
            block_id: 'importance',
            type: 'input',
            element: {
              action_id: 'importance_id',
              type: 'static_select',
              placeholder: {
                type: 'plain_text',
                text: 'Select importance',
                emoji: true
              },
              options: [
                {
                  text: {
                    type: 'plain_text',
                    text: 'High 💎💎✨',
                    emoji: true
                  },
                  value: 'high'
                },
                {
                  text: {
                    type: 'plain_text',
                    text: 'Medium 💎',
                    emoji: true
                  },
                  value: 'medium'
                },
                {
                  text: {
                    type: 'plain_text',
                    text: 'Low ⚪️',
                    emoji: true
                  },
                  value: 'low'
                }
              ]
            },
            label: {
              type: 'plain_text',
              text: 'Importance'
            }
          }
        ]
      })
    };

    await context.sendActivity(viewData);

    // axios.post('https://slack.com/api/views.open', qs.stringify(viewData))
    // .then((result) => {
    //   res.sendStatus(200);
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
  });
});

http.listen(CONSTANTS.PORT, () => {
  console.log(`This app listen on port ${CONSTANTS.PORT}`);
});
