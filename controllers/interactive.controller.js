const { WebClient } = require('@slack/web-api');

const UTILS = require('../utils');
const CONSTANTS  = require('../constants');
const userController = require('./user.controller');

const web = new WebClient(CONSTANTS.SLACK_APP_OPTIONS.botToken);

const {
  giveTemplate,
  generalTemplate
} = require('../templates');

const checkBag = (userInfo, quantity) => {
  const giveBag = userInfo.give_bag;

  return (giveBag > 0 && giveBag >= quantity);
};

const checkUserIsActive = async (userId) => {
  const query = { user: userId };
  const userInfo = await web.users.info(query);

  if (userInfo.ok && userInfo.user) {
    return !!(userInfo.user.deleted);
  }
};

const checkUserIsHuman = async (userId) => {
  const query = { user: userId };
  const userInfo = await web.users.info(query);

  if (userInfo.ok && userInfo.user) {
    return !!(userInfo.user.is_bot);
  }
};

const giveTheGift = async (payload) => {
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

  if (userIdRequest === userIdReceive) {
    modal.view = generalTemplate(CONSTANTS.MESSAGES.NOT_GIVE_TO_SELF);

    web.views.open(modal);

    return;
  }

  const quantityIsInteger = Number.isInteger(valueQuantity);

  if (!quantityIsInteger) {
    modal.view = generalTemplate(CONSTANTS.MESSAGES.POINT_IS_NAN);

    web.views.open(modal);

    return;
  }

  const getUserRequestInfo = await userController.findOrCreate(userIdRequest);
  const checkUserRequestBag = checkBag(getUserRequestInfo, valueQuantity);

  if (!checkUserRequestBag) {
    modal.view = generalTemplate(CONSTANTS.MESSAGES.OUT_OF_POINTS);

    web.views.open(modal);

    return;
  }

  return await userController.updateUserBag(
    userIdRequest,
    userIdReceive,
    valueQuantity
  );
};

const showModal = async (req, res) => {
  if (!req.body.payload) {
    res.status(400).send({
      message: "Cannot get user information."
    });

    return;
  }

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
      const getUserRequestInfo = await userController.findOrCreate(userIdRequest);

      if (getUserRequestInfo.error) {
        res.status(400).json({ message: userInfo.error });

        return;
      }

      modal.view = giveTemplate(
        getUserRequestInfo.give_bag,
        getUserRequestInfo.receive_bag
      );

      web.views.open(modal);
    }
  }

  res.status(200).end();
};

const handleDataSubmit = (req, res) => {
  if (!req.body.payload) {
    res.status(400).send({
      message: "Cannot get user information."
    });

    return;
  }

  const payload = JSON.parse(req.body.payload);

  const slackView = payload.view;

  if (slackView) {
    const cbId = slackView.callback_id;

    if (cbId === CONSTANTS.MODAL_CALLBACK_ID.GIVE) {
      giveTheGift(payload);
    }

    // if (cbId === CONSTANTS.MODAL_CALLBACK_ID.GIFT_REQUEST) {
    //   requestGift(payload);
    // }
  }
};

const handleInteractiveFromSlack = (req, res) => {
  showModal(req, res);
  handleDataSubmit(req, res);
};

module.exports = handleInteractiveFromSlack;
