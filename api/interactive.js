const { WebClient } = require('@slack/web-api');

const {
  getOrCreate,
  updateUser
} = require('./users');
const { createTransaction } = require('./transactions');
const UTILS = require('../utils');
const CONSTANTS  = require('../constants');
const {
  giveTemplate,
  choiceTemplate,
  giftRequest
} = require('../templates');

const web = new WebClient(CONSTANTS.SLACK_APP_OPTIONS.botToken);

const showModal = (req, res) => {
  if (req && req.body && req.body.payload) {
    const payload = JSON.parse(req.body.payload);

    const activityType = payload.type;
    const modal = {
      "trigger_id": payload.trigger_id
    }

    if (activityType === CONSTANTS.SHORTCUT) {
      modal.view = choiceTemplate;

      web.views.open(modal);
    }

    if (activityType === CONSTANTS.VIEW_SUBMISSION) {
      res.status(200).end();

      const slackView = payload.view;

      if (slackView) {
        const slackValues = slackView.state.values;
        const radioButtonValue = UTILS.findValue(slackValues, 'value');

        switch(radioButtonValue) {
          case CONSTANTS.RADIO_BUTTONS.GIVE:
            modal.view = giveTemplate;

            web.views.open(modal);

            break;

          case CONSTANTS.RADIO_BUTTONS.GIFT_REQUEST:
            modal.view = giftRequest

            web.views.open(modal);

            break;

          default:
        }
      }
    }

    res.status(200).end();
  }
};

const handleFormData = async (context) => {
  const channelData = await context._activity.channelData;
  const slackView = channelData.view;

  if (slackView) {
    const cbId = slackView.callback_id;
    const slackValues = slackView.state.values;

    switch(cbId) {
      case CONSTANTS.MODAL_CALLBACK.GIVE:
        giveTheGift(await context);

        break;

      case CONSTANTS.MODAL_CALLBACK.GIFT_REQUEST:
        console.log(slackValues);

        break;
    }
  }
};

const giveTheGift = async (context) => {
  const channelData = context._activity.channelData;
  const slackView = channelData.view;
  const fromUser = channelData.user;
  const slackValues = slackView.state.values;
  const selectedUser = UTILS.findValue(slackValues, 'selected_user');
  const quantityValue = parseInt(UTILS.findValue(slackValues, 'value'));
  const isIntNumber = Number.isInteger(quantityValue);
  const [
    fromUserInfo,
    toUserInfo
  ] = await getSlacksUserInfo(await context, fromUser.id, selectedUser);
  const getFromUserInfo = await getOrCreate(fromUserInfo.user);

  const bagIsValid = await checkBag(getFromUserInfo, quantityValue);

  getOrCreate(toUserInfo.user);

  if (bagIsValid && isIntNumber) {
    const userUpdated = await updateUser(
      fromUserInfo.user.id,
      toUserInfo.user.id,
      quantityValue
    );

    if (userUpdated) {
      const payload = {
        from_user_id: fromUserInfo.user.id,
        quantity: quantityValue,
        to_user_id: toUserInfo.user.id
      };

      const transCreated = await createTransaction(payload);

      if (transCreated) {
        console.log(await context);
      }
    }
  }
};

const getSlacksUserInfo = async (context, fromUserId, toUserId) => {
  return await Promise.all([
    getSlackUserInfo(context, fromUserId),
    getSlackUserInfo(context, toUserId)
  ]);
};

const checkBag = async (fromUserInfo, quantity) => {
  const giveBag = fromUserInfo.give_bag;

  if (giveBag > 0 && giveBag >= quantity) {
    return true;
  }
};

const getSlackUserInfo = (context, userId) => {
  return context._adapter.slack.users.info({
    user: userId
  });
};

const handleInteractiveFromSlack = (req, res) => {
  showModal(req, res);
};

module.exports = {
  handleInteractiveFromSlack
};
