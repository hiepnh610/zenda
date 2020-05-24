const giveTemplate = {
  "type": "modal",
  "callback_id": "modal-cb",
  "title": {
    "type": "plain_text",
    "text": "Bimbim"
  },
  "submit": {
    "type": "plain_text",
    "text": "Submit",
    "emoji": true
  },
  "blocks": [
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "Bạn muốn gửi tặng cho ai?"
      },
      "accessory": {
        "type": "multi_static_select",
        "placeholder": {
          "type": "plain_text",
          "text": "Chọn người bạn muốn tặng.",
          "emoji": true
        },
        "options": [
          {
            "text": {
              "type": "plain_text",
              "text": "Choice 1",
              "emoji": true
            },
            "value": "value-0"
          },
          {
            "text": {
              "type": "plain_text",
              "text": "Choice 2",
              "emoji": true
            },
            "value": "value-1"
          },
          {
            "text": {
              "type": "plain_text",
              "text": "Choice 3",
              "emoji": true
            },
            "value": "value-2"
          }
        ]
      }
    },

    {
      "type": "input",
      "element": {
        "type": "plain_text_input",
        "action_id": "title",
        "placeholder": {
          "type": "plain_text",
          "text": "Số bimbim muốn gửi tặng."
        }
      },
      "label": {
        "type": "plain_text",
        "text": "Số lượng."
      }
    }
  ]
};

module.exports = giveTemplate;
