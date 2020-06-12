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

module.exports = {
  getChannelInfo,
  checkUserInChannel
};
