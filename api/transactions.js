const { WebClient } = require('@slack/web-api');

const Transaction = require('../models/transactions');
const CONSTANTS = require('../constants');

const web = new WebClient(CONSTANTS.SLACK_APP_OPTIONS.botToken);

const createTransaction = (transactionData) => {
  const transaction = new Transaction(transactionData);

  transaction.save((e, trans) => {
    if (!e && trans) {
      sendMessage(transactionData);
    }
  });
};

const getChannelInfo = async () => {
  const channelList = await web.conversations.list();

  return channelList.channels.filter(channel => channel.name === 'bimbim');
};

const sendMessage = async (transactionData) => {
  const targetChannel = await getChannelInfo();

  if (targetChannel.length) {
    const channelId = targetChannel[0].id;
    const userRequestId = transactionData.user_request_id;
    const userReceiveId = transactionData.user_receive_id;
    const quantity = transactionData.quantity;

    const params = {
      channel: channelId,
      text: `<@${userRequestId}> đã gửi tặng <@${userReceiveId}> ${quantity} bimbim.`
    };

    const isMessageSendSuccess = await web.chat.postMessage(params);

    if (isMessageSendSuccess.ok) {
      checkUserInChannel(channelId, userRequestId);
      checkUserInChannel(channelId, userReceiveId);
    }
  }
};

const checkUserInChannel = async (channelId, userId) => {
  const usersInChannel = await web.conversations.members({
    channel: channelId
  });

  if (usersInChannel.ok && usersInChannel.members.length) {
    const isUserInChannel = await usersInChannel.members.find(member => {
      return member === userId;
    });

    if (!isUserInChannel) {
      inviteUserToChannel(channelId, userId);
    }
  }
};

const inviteUserToChannel = (channelId, userId) => {
  const params = {
    channel: channelId,
    users: userId
  };

  web.conversations.invite(params);
};

module.exports = {
  createTransaction
};
