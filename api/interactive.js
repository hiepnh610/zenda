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
  giftRequest,
  errorTemplate
} = require('../templates');

const web = new WebClient(CONSTANTS.SLACK_APP_OPTIONS.botToken);

const showModal = (req, res) => {
  if (req && req.body && req.body.payload) {
    const payload = JSON.parse(req.body.payload);

    const activityType = payload.type;
    const modal = {
      "trigger_id": payload.trigger_id
    };

    if (activityType === CONSTANTS.SHORTCUT) {
      modal.view = choiceTemplate;

      web.views.open(modal);
    }

    if (activityType === CONSTANTS.VIEW_SUBMISSION) {
      const slackView = payload.view;

      if (slackView) {
        const slackValues = slackView.state.values;
        const radioButtonValue = UTILS.findValue(slackValues, 'value');

        switch(radioButtonValue) {
          case CONSTANTS.RADIO_BUTTONS.GIVE:
            res.status(200).end();

            modal.view = giveTemplate;

            web.views.open(modal);

            break;

          case CONSTANTS.RADIO_BUTTONS.GIFT_REQUEST:
            res.status(200).end();

            modal.view = giftRequest

            web.views.open(modal);

            break;

          default:
            res.status(400);
        }
      }
    }

    res.status(200).end();
  }
};

const handleDataSubmit = (req) => {
  if (req && req.body && req.body.payload) {
    const payload = JSON.parse(req.body.payload);

    const slackView = payload.view;

    if (slackView) {
      const cbId = slackView.callback_id;
      const slackValues = slackView.state.values;

      switch(cbId) {
        case CONSTANTS.MODAL_CALLBACK.GIVE:
          giveTheGift(req);

          break;

        case CONSTANTS.MODAL_CALLBACK.GIFT_REQUEST:
          console.log(slackValues);

          break;
      }
    }
  }
};

const giveTheGift = async (req) => {
  if (req && req.body && req.body.payload) {
    const payload = JSON.parse(req.body.payload);
    const modal = {
      "trigger_id": payload.trigger_id
    };
    const slackView = payload.view;

    const userRequest = payload.user;
    const userIdRequest = userRequest.id;

    const valuesRequest = slackView.state.values;

    const userIdReceive = UTILS.findValue(valuesRequest, 'selected_user');
    const valueQuantity = parseInt(UTILS.findValue(valuesRequest, 'value'));
    const isIntNumber = Number.isInteger(valueQuantity);

    const isDeleted = await checkUserIsActive(userIdReceive);

    if (isDeleted) {
      modal.view = errorTemplate(CONSTANTS.MESSAGES.NOT_GIVE_TO_DEACTIVATE_USER);

      web.views.open(modal);

      return;
    }

    const isBot = await checkUserIsHuman(userIdReceive);

    if (isBot) {
      modal.view = errorTemplate(CONSTANTS.MESSAGES.NOT_GIVE_TO_BOT);

      web.views.open(modal);

      return;
    }

    const getUserRequestInfo = await getOrCreate(userIdRequest);
    const checkUserRequestBag = checkBag(getUserRequestInfo, valueQuantity);

    if (userIdRequest === userIdReceive) {
      modal.view = errorTemplate(CONSTANTS.MESSAGES.NOT_GIVE_TO_SELF);

      web.views.open(modal);

      return;
    }

    if (!checkUserRequestBag) {
      modal.view = errorTemplate(CONSTANTS.MESSAGES.OUT_OF_POINTS);

      web.views.open(modal);

      return;
    }

    if (checkUserRequestBag && isIntNumber) {
      const transactionData = await updateUser(
        userIdRequest,
        userIdReceive,
        valueQuantity
      );

      if (transactionData) {
        createTransaction(transactionData);
      }
    }
  }
};

const checkUserIsHuman = async (userId) => {
  const query = { user: userId };
  const userInfo = await web.users.info(query);

  if (userInfo.ok && userInfo.user) {
    return !!(userInfo.user.is_bot);
  }
};

const checkUserIsActive = async (userId) => {
  const query = { user: userId };
  const userInfo = await web.users.info(query);

  if (userInfo.ok && userInfo.user) {
    return !!(userInfo.user.deleted);
  }
};

const checkBag = (userInfo, quantity) => {
  const giveBag = userInfo.give_bag;

  return (giveBag > 0 && giveBag >= quantity);
};

const handleInteractiveFromSlack = (req, res) => {
  showModal(req, res);
  handleDataSubmit(req);
};

module.exports = {
  handleInteractiveFromSlack
};
