const { WebClient } = require('@slack/web-api');
const _ = require('lodash');

const {
  getOrCreate,
  updateUser
} = require('./users');
const { createTransaction } = require('./transactions');
const UTILS = require('../utils');
const CONSTANTS  = require('../constants');
const {
  giveTemplate,
  giftRequestTemplate,
  generalTemplate
} = require('../templates');

const web = new WebClient(CONSTANTS.SLACK_APP_OPTIONS.botToken);

const showModal = async (req, res) => {
  if (req && req.body && req.body.payload) {
    const payload = JSON.parse(req.body.payload);
    const callbackId = payload.callback_id;
    const activityType = payload.type;
    const modal = {
      "trigger_id": payload.trigger_id
    };

    if (activityType === CONSTANTS.SHORTCUT) {
      if (callbackId === CONSTANTS.SHORT_CUT_CALLBACK_ID.GIVE) {
        const userRequest = payload.user;
        const userIdRequest = userRequest.id;
        const getUserRequestInfo = await getOrCreate(userIdRequest);

        modal.view = giveTemplate(
          getUserRequestInfo.give_bag,
          getUserRequestInfo.receive_bag
        );

        web.views.open(modal);
      }

      if (callbackId === CONSTANTS.SHORT_CUT_CALLBACK_ID.GIFT_REQUEST) {
        modal.view = giftRequestTemplate;

        web.views.open(modal);
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
        case CONSTANTS.MODAL_CALLBACK_ID.GIVE:
          giveTheGift(req);

          break;

        case CONSTANTS.MODAL_CALLBACK_ID.GIFT_REQUEST:
          console.log(slackValues);

          break;

        default:
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

    const userIdReceive = UTILS.findValue(valuesRequest, 'user_receive').selected_user;
    const valueQuantity = parseInt(UTILS.findValue(valuesRequest, 'quantity').value);
    const userMessage = UTILS.findValue(valuesRequest, 'message').value;
    const isIntNumber = Number.isInteger(valueQuantity);

    const isDeleted = await checkUserIsActive(userIdReceive);

    if (isDeleted) {
      modal.view = generalTemplate(CONSTANTS.MESSAGES.NOT_GIVE_TO_DEACTIVATE_USER);

      web.views.open(modal);

      return;
    }

    const isBot = await checkUserIsHuman(userIdReceive);

    if (isBot) {
      modal.view = generalTemplate(CONSTANTS.MESSAGES.NOT_GIVE_TO_BOT);

      web.views.open(modal);

      return;
    }

    const getUserRequestInfo = await getOrCreate(userIdRequest);
    const checkUserRequestBag = checkBag(getUserRequestInfo, valueQuantity);

    if (userIdRequest === userIdReceive) {
      modal.view = generalTemplate(CONSTANTS.MESSAGES.NOT_GIVE_TO_SELF);

      web.views.open(modal);

      return;
    }

    if (!checkUserRequestBag) {
      modal.view = generalTemplate(CONSTANTS.MESSAGES.OUT_OF_POINTS);

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
        createTransaction({
          ...transactionData,
          text: userMessage
        });
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
