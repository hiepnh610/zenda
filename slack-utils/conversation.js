const { WebClient } = require('@slack/web-api');

const CONSTANTS  = require('../constants');

const web = new WebClient(CONSTANTS.SLACK_APP_OPTIONS.botToken);

const inviteUserToChannel = (channelId, userId) => {
  const params = {
    channel: channelId,
    users: userId,
  };

  web.conversations.invite(params);
};

const checkUserInChannel = async (channelId, userList) => {
  const usersInChannel = await web.conversations.members({
    channel: channelId,
    limit: 1000
  });

  if (usersInChannel.ok && usersInChannel.members.length && userList.length) {
    userList.forEach((user) => {
      const isUserInChannel = usersInChannel.members.find((member) => {
        return member === user;
      });

      if (!isUserInChannel) {
        inviteUserToChannel(channelId, user);
      }
    });
  }
};

const sendDirectMessage = async (dataToSendMessage) => {
  const {
    user_request_id,
    user_receive_id,
    directMessageToRequestUser,
    directMessageToReceiveUser,
    notificationDirectMessageToRequestUser,
    notificationDirectMessageToReceiveUser
  } = dataToSendMessage;

  const paramsToSendMessageToRequestUser = {
    channel: user_request_id,
    text: notificationDirectMessageToRequestUser,
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: directMessageToRequestUser
        },
      },
    ],
  };

  const paramsToSendMessageToReceiveUser = {
    channel: user_receive_id,
    text: notificationDirectMessageToReceiveUser,
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: directMessageToReceiveUser
        },
      },
    ],
  };

  await web.chat.postMessage(paramsToSendMessageToRequestUser);
  await web.chat.postMessage(paramsToSendMessageToReceiveUser);
};

const sendMessageToChannel = async (dataToSendMessage) => {
  const channelId = process.env.SLACK_CHANNEL_ID;
  const {
    user_request_id,
    user_receive_id,
    message,
    notification
  } = dataToSendMessage;

  const params = {
    channel: channelId,
    text: notification,
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: message
        },
      },
    ],
  };

  const isMessageSendSuccess = await web.chat.postMessage(params);

  if (isMessageSendSuccess.ok) {
    if (user_request_id && user_receive_id) {
      const listUserToCheck = [
        user_request_id,
        user_receive_id
      ];

      checkUserInChannel(channelId, listUserToCheck);
    }
  }
};

module.exports = {
  checkUserInChannel,
  sendMessageToChannel,
  sendDirectMessage
};
