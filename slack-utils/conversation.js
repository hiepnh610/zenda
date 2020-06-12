const { WebClient } = require('@slack/web-api');

const CONSTANTS  = require('../constants');

const web = new WebClient(CONSTANTS.SLACK_APP_OPTIONS.botToken);

const getChannelInfo = async () => {
  const channelList = await web.conversations.list();

  return channelList.channels
    .filter((channel) => channel.name === 'bimbim');
};

const inviteUserToChannel = (channelId, userId) => {
  const params = {
    channel: channelId,
    users: userId,
  };

  web.conversations.invite(params);
};

const checkUserInChannel = async (channelId, userId) => {
  const usersInChannel = await web.conversations.members({
    channel: channelId
  });

  if (usersInChannel.ok && usersInChannel.members.length) {
    const isUserInChannel = await usersInChannel.members.find((member) => {
      return member === userId;
    });

    if (!isUserInChannel) {
      inviteUserToChannel(channelId, userId);
    }
  }
};

const sendMessageToChannel = async (giftTransaction) => {
  const targetChannel = await getChannelInfo();

  if (targetChannel.length) {
    const channelId = targetChannel[0].id;
    const userRequestId = giftTransaction.user_request_id;
    const userReceiveId = giftTransaction.user_receive_id;
    const amount = giftTransaction.amount;
    const message = giftTransaction.message;

    const params = {
      channel: channelId,
      text: '',
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `<@${userRequestId}> đã gửi tặng <@${userReceiveId}> ${amount} bimbim. Với lời nhắn: \n>${message}`,
          },
        },
      ],
    };

    const isMessageSendSuccess = await web.chat.postMessage(params);

    if (isMessageSendSuccess.ok) {
      checkUserInChannel(channelId, userRequestId);
      checkUserInChannel(channelId, userReceiveId);
    }
  }
};

module.exports = {
  getChannelInfo,
  checkUserInChannel,
  sendMessageToChannel
};
