const { MODAL_CALLBACK_ID } = require('../constants');

const pointsClaimTemplate = {
  type: 'modal',
  callback_id: MODAL_CALLBACK_ID.CLAIM,
  title: {
    type: 'plain_text',
    text: 'Đòi star'
  },
  submit: {
    type: 'plain_text',
    text: 'Đòi star',
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
        action_id: 'amount',
        placeholder: {
          type: 'plain_text',
          text: 'Số star muốn đòi.',
        },
      },
      label: {
        type: 'plain_text',
        text: 'Số lượng.',
      },
    },

    {
      type: 'input',
      element: {
        type: 'users_select',
        action_id: 'user_receive',
        placeholder: {
          type: 'plain_text',
          text: 'Chọn đồng nghiệp bạn muốn đòi star.',
          emoji: true,
        },
      },
      label: {
        type: 'plain_text',
        text: 'Bạn muốn đòi star từ ai?',
      },
    },

    {
      type: 'input',
      element: {
        type: 'plain_text_input',
        action_id: 'message',
        multiline: true,
        min_length: 10,
        placeholder: {
          type: 'plain_text',
          text: 'Nội dung ban muốn gửi tới đồng nghiệp.',
          emoji: true,
        },
      },
      label: {
        type: 'plain_text',
        text: 'Lời nhắn',
        emoji: true,
      },
    }
  ]
};

module.exports = pointsClaimTemplate;
