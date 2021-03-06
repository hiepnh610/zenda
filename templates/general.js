const generalTemplate = (message) => {
  return {
    type: 'modal',
    title: {
      type: 'plain_text',
      text: 'Star',
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

module.exports = generalTemplate;
