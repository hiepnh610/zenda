const { WebClient } = require('@slack/web-api');

const CONSTANTS  = require('../constants');
const userService = require('../services/user.service');
const slackUtil = require('../slack-utils');

const web = new WebClient(CONSTANTS.SLACK_APP_OPTIONS.botToken);

const { giveTemplate } = require('../templates');

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
      const getUserRequestInfo = await userService.findOrCreate(userIdRequest);

      if (getUserRequestInfo.error) {
        res.status(400).json({ message: getUserRequestInfo.error });

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

const handleDataSubmit = async (req, res) => {
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
      const giftTransaction = await userService.updateUserBag(payload);

      if (giftTransaction.error) {
        res.status(400).json({ message: giftTransaction.error });

        return;
      }
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
