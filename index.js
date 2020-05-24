const express     = require('express');
const app         = express();
const http        = require('http').Server(app);
const bodyParser  = require('body-parser');

const { SlackAdapter, SlackDialog, SlackBotWorker }   = require('botbuilder-adapter-slack');

const CONSTANTS = require('./constants');

const botAdapter = new SlackAdapter(CONSTANTS.SLACK_APP_OPTIONS);
const botDialog = new SlackDialog('My Dialog', 'callback_123', 'Save');
const bot = new SlackBotWorker();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/shortcut', (req, res) => {
  botAdapter.processActivity(req, res, async(context) => {});
});

http.listen(CONSTANTS.PORT, () => {
  console.log(`This app listen on port ${CONSTANTS.PORT}`);
});
