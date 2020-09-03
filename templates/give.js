const { MODAL_CALLBACK_ID } = require('../constants');

const giveTemplate = (giveBag) => {
  return {
    type: 'modal',
    callback_id: MODAL_CALLBACK_ID.GIVE,
    title: {
      type: 'plain_text',
      text: 'star',
    },
    submit: {
      type: 'plain_text',
      text: 'Tặng',
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
          text: `Số star bạn có thể tặng: *${giveBag}* star`,
        },
      },
      {
        type: 'input',
        element: {
          type: 'plain_text_input',
          action_id: 'amount',
          placeholder: {
            type: 'plain_text',
            text: 'Số star muốn gửi tặng.',
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
            text: 'Chọn đồng nghiệp bạn muốn tặng.',
            emoji: true,
          },
        },
        label: {
          type: 'plain_text',
          text: 'Bạn muốn gửi tặng cho ai?',
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
            text: 'Viết lời yêu thương tới đồng nghiệp.',
            emoji: true,
          },
        },
        label: {
          type: 'plain_text',
          text: 'Lời nhắn',
          emoji: true,
        },
      },
    ],
  };
};

module.exports = giveTemplate;
