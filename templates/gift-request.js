const { MODAL_CALLBACK } = require('../constants');

const giftRequestTemplate = {
  type: 'modal',
  callback_id: MODAL_CALLBACK.GIFT_REQUEST,
  title: {
    type: 'plain_text',
    text: 'Bimbim'
  },
  submit: {
    type: 'plain_text',
    text: 'Gửi yêu cầu',
    emoji: true
  },
  close: {
    type: 'plain_text',
    text: 'Huỷ bỏ',
    emoji: true
  },
  blocks: [
    {
      type: 'input',
      element: {
        type: 'plain_text_input',
        action_id: 'gift-name',
        placeholder: {
          type: 'plain_text',
          text: 'Tên quà tặng bạn muốn yêu cầu.'
        },
      },
      label: {
        type: 'plain_text',
        text: 'Tên quà.'
      }
    },

    {
      type: 'input',
      element: {
        type: 'plain_text_input',
        action_id: 'gift-link',
        placeholder: {
          type: 'plain_text',
          text: 'Đường dẫn của sản phẩm hoặc hình ảnh.'
        },
      },
      label: {
        type: 'plain_text',
        text: 'Đường dẫn tham khảo.'
      }
    }
  ]
};

module.exports = giftRequestTemplate;
