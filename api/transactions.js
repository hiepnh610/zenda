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

  return channelList.channels.filter((channel) => channel.name === 'bimbim');
};

const sendMessage = async (transactionData) => {
  const targetChannel = await getChannelInfo();

  if (targetChannel.length) {
    const channelId = targetChannel[0].id;
    const userRequestId = transactionData.user_request_id;
    const userReceiveId = transactionData.user_receive_id;
    const quantity = transactionData.quantity;
    const text = transactionData.text;

    const params = {
      channel: channelId,
      text: '',
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `<@${userRequestId}> đã gửi tặng <@${userReceiveId}> ${quantity} bimbim. Với lời nhắn: \n>${text}`,
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

const checkUserInChannel = async (channelId, userId) => {
  const usersInChannel = await web.conversations.members({
    channel: channelId,
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

const inviteUserToChannel = (channelId, userId) => {
  const params = {
    channel: channelId,
    users: userId,
  };

  web.conversations.invite(params);
};

const getTransactions = (req, res) => {
  Transaction
    .find({})
    .exec(async (e, transactions) => {
      if (e) {
        return res.status(400).send(e);
      }

      if (transactions.length) {
        const data = await transactions.map(async (tran) => {
          const userRequestInfo = await web.users.info({
            user: tran.user_request_id
          });
          const userReceiveInfo = await web.users.info({
            user: tran.user_receive_id
          });

          if (
            userRequestInfo.ok && userRequestInfo.user &&
            userReceiveInfo.ok && userReceiveInfo.user
          ) {
            const userRequestName = userRequestInfo.user.profile.display_name;

            return {
              user_request_name: userRequestName
            }
          }
        });
        console.log(data);

        // res.status(200).json(data);
      }
    });
};

module.exports = {
  createTransaction,
  getTransactions
};
