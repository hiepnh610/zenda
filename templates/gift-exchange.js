const { MODAL_CALLBACK_ID } = require('../constants');

const giftExchangeTemplate = (options, points) => {
  return {
    type: 'modal',
    callback_id: MODAL_CALLBACK_ID.GIFT_EXCHANGE,
    title: {
      type: 'plain_text',
      text: 'Đổi quà',
    },
    submit: {
      type: 'plain_text',
      text: 'Đổi quà',
      emoji: true,
    },
    close: {
      type: 'plain_text',
      text: 'Huỷ bỏ',
      emoji: true,
    },
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `Số bimbim bạn có thể đổi quà: *${points}* bimbim`,
        },
      },
      {
        type: 'input',
        element: {
          type: 'radio_buttons',
          action_id: 'gift_exchange',
          options
        },
        label: {
          type: 'plain_text',
          text: 'Danh sách quà tặng.',
        },
      },
    ],
  };
};

module.exports = giftExchangeTemplate;
