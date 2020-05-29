const outOfPointsTemplate = {
  type: 'modal',
  title: {
    type: 'plain_text',
    text: 'Bimbim',
  },
  close: {
    type: 'plain_text',
    text: 'Đóng',
    emoji: true,
  },
  blocks: [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: ":no_entry: Bạn không đủ số bimbim để tặng."
      }
    }
  ]
};

module.exports = outOfPointsTemplate;
