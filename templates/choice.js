const { RADIO_BUTTONS } = require('../constants');

const choiceTemplate = {
  type: 'modal',
  callback_id: 'modal-choice-cb',
  title: {
    type: 'plain_text',
    text: 'Bimbim'
  },
  close: {
    type: 'plain_text',
    text: 'Huỷ bỏ',
    emoji: true
  },
  submit: {
    type: 'plain_text',
    text: 'Chọn',
    emoji: true
  },
  blocks: [
    {
      type: 'input',
      element: {
        type: 'radio_buttons',
        initial_option: {
          text: {
            type: 'plain_text',
            text: 'Tặng bimbim.'
          },
          value: 'give',
          description: {
            type: 'plain_text',
            text: 'Tặng bimbim cho đồng nghiệp.'
          },
        },
        options: [
          {
            text: {
              type: 'plain_text',
              text: 'Tặng bimbim.'
            },
            value: RADIO_BUTTONS.GIVE,
            description: {
              type: 'plain_text',
              text: 'Tặng bimbim cho đồng nghiệp.'
            },
          },
          {
            text: {
              type: 'plain_text',
              text: 'Xem túi đồ.'
            },
            value: RADIO_BUTTONS.CHECK_BAG,
            description: {
              type: 'plain_text',
              text: 'Xem số lượng bimbim trong túi đồ.'
            },
          },
          {
            text: {
              type: 'plain_text',
              text: 'Yêu cầu quà tặng.'
            },
            value: RADIO_BUTTONS.GIFT_REQUEST,
            description: {
              type: 'plain_text',
              text: 'Gửi yêu cầu quà tặng cho BTC.'
            },
          }
        ]
      },
      label: {
        type: 'plain_text',
        text: 'Lựa chọn 1 trong những lựa chọn sau.'
      }
    }
  ]
};

module.exports = choiceTemplate;
