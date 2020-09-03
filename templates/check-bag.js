const { MODAL_CALLBACK_ID } = require('../constants');

const checkBagTemplate = (giveBag, receiveBag) => {
  return {
    type: 'modal',
    callback_id: MODAL_CALLBACK_ID.CHECK_BAG,
    title: {
      type: 'plain_text',
      text: 'Kiếm tra túi đồ',
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
          text: `Số star bạn có thể cho: *${giveBag}* star`,
        }
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `Số star bạn đã được tặng: *${receiveBag}* star`,
        }
      }
    ]
  };
};

module.exports = checkBagTemplate;
