const choiceTemplate = {
  type: 'modal',
  callback_id: 'modal-choice-cb',
  title: {
    type: 'plain_text',
    text: 'Bimbim',
  },
  close: {
    type: 'plain_text',
    text: 'Huỷ bỏ',
    emoji: true,
  },
  submit: {
    type: 'plain_text',
    text: 'Gửi',
    emoji: true,
  },
  blocks: [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: 'Chương trình tặng thưởng nội bộ.',
      },
      accessory: {
        type: 'radio_buttons',
        initial_option: {
          text: {
            type: 'plain_text',
            text: 'Tặng bimbim.',
          },
          value: 'give',
          description: {
            type: 'plain_text',
            text: 'Tặng bimbim cho đồng nghiệp.',
          },
        },
        options: [
          {
            text: {
              type: 'plain_text',
              text: 'Tặng bimbim.',
            },
            value: 'give',
            description: {
              type: 'plain_text',
              text: 'Tặng bimbim cho đồng nghiệp.',
            },
          },
          {
            text: {
              type: 'plain_text',
              text: 'Xem túi đồ.',
            },
            value: 'check-bag',
            description: {
              type: 'plain_text',
              text: 'Xem số lượng bimbim trong túi đồ.',
            },
          },
        ],
      },
    },
  ],
};

module.exports = choiceTemplate;
