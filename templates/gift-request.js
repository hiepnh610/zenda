const giftRequestTemplate = {
  type: 'modal',
  callback_id: 'modal-gift-request-cb',
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
        action_id: 'title',
        placeholder: {
          type: 'plain_text',
          text: 'Tên quà tặng bạn muốn yêu cầu.',
          min_length: 0
        },
      },
      label: {
        type: 'plain_text',
        text: 'Tên quà.'
      }
    }
  ]
};

module.exports = giftRequestTemplate;
