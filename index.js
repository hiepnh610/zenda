const express = require('express');
const app     = express();
const http    = require('http').Server(app);

const { Botkit }         = require('botkit');
const { SlackAdapter }   = require('botbuilder-adapter-slack');
const { MongoDbStorage } = require('botbuilder-storage-mongodb');

const CONSTANTS = require('./constants');

const storage = mongoStorage = new MongoDbStorage({
  url : DB.MONGODB_URI,
});

const options = {
  botToken: process.env.SLACK_BOT_TOKEN,
  clientId: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  clientSigningSecret: process.env.SLACK_SIGNING_SECRET,
  verificationToken: process.env.SLACK_VERIFICATION_TOKEN
};

const adapter = new SlackAdapter(options);

const controller = new Botkit({
  adapter,
  storage
});

controller.on('message', async(bot, message) => {
  await bot.reply(message, 'I heard a message!');
});

http.listen(CONSTANTS.PORT, () => {
  console.log(`This app listen on port ${CONSTANTS.PORT}`);
});
