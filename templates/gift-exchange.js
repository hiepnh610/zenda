const { MODAL_CALLBACK_ID } = require('../constants');

const giftExchangeTemplate = (options) => {
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
        type: 'actions',
        elements: [
          {
            type: 'radio_buttons',
            options
          }
        ]
      }
    ]
  };
};

module.exports = giftExchangeTemplate;
