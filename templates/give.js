const giveTemplate = {
  type: 'modal',
  callback_id: 'modal-cb',
  title: {
    type: 'plain_text',
    text: 'Bimbim'
  },
  submit: {
    type: 'plain_text',
    text: 'Submit',
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
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: 'Bạn muốn gửi tặng cho ai?'
      },
      accessory: {
        type: 'users_select',
        placeholder: {
          type: 'plain_text',
          text: 'Chọn người bạn muốn tặng.',
          emoji: true
        }
      },
    }
  ]
};

module.exports = giveTemplate;
