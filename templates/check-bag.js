const checkBagTemplate = (message) => {
  return {
    type: 'modal',
    title: {
      type: 'plain_text',
      text: 'Bimbim',
    },
    close: {
      type: 'plain_text',
      text: 'Đóng',
      emoji: true,
    },
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: message,
        },
      },
    ],
  };
};

module.exports = checkBagTemplate;
