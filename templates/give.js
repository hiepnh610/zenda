const { MODAL_CALLBACK } = require('../constants');

const giveTemplate = {
  type: 'modal',
  callback_id: MODAL_CALLBACK.GIVE,
  title: {
    type: 'plain_text',
    text: 'Bimbim'
  },
  submit: {
    type: 'plain_text',
    text: 'Tặng',
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
        action_id: 'title',
        placeholder: {
          type: 'plain_text',
          text: 'Số bimbim muốn gửi tặng.'
        },
      },
      label: {
        type: 'plain_text',
        text: 'Số lượng.'
      }
    },

    {
      type: 'input',
      element: {
        type: 'users_select',
        placeholder: {
          type: 'plain_text',
          text: 'Chọn người bạn muốn tặng.',
          emoji: true
        }
      },
      label: {
        type: 'plain_text',
        text: 'Bạn muốn gửi tặng cho ai?'
      }
    }
  ]
};

module.exports = giveTemplate;
