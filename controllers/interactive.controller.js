const { WebClient } = require('@slack/web-api');

const CONSTANTS  = require('../constants');
const userService = require('../services/user.service');
const giftService = require('../services/gift.service');
const giftExchangeService = require('../services/gift-exchange.service');

const web = new WebClient(CONSTANTS.SLACK_APP_OPTIONS.botToken);

const {
  giftClaimTemplate,
  giveTemplate,
  checkBagTemplate,
  giftExchangeTemplate,
  generalTemplate
} = require('../templates');

const showModal = async (req, res) => {
  if (!req.body.payload) {
    res.status(400).send({
      message: 'Cannot get user information.'
    });

    return;
  }

  res.status(200).end();

  const payload = JSON.parse(req.body.payload);
  const callbackId = payload.callback_id;
  const activityType = payload.type;
  const modal = {
    "trigger_id": payload.trigger_id
  };

  if (activityType === CONSTANTS.SHORTCUT) {
    const userRequest = payload.user;
    const userIdRequest = userRequest.id;

    if (callbackId === CONSTANTS.SHORT_CUT_CALLBACK_ID.GIVE) {
      const getUserRequestInfo = await userService.findOrCreate(userIdRequest);

      if (getUserRequestInfo && getUserRequestInfo.error) {
        res.status(400).send({ message: getUserRequestInfo.error });

        return;
      }

      modal.view = giveTemplate(getUserRequestInfo.give_bag);

      web.views.open(modal);
    }

    if (callbackId === CONSTANTS.SHORT_CUT_CALLBACK_ID.GIFT_CLAIM) {
      modal.view = giftClaimTemplate;

      web.views.open(modal);
    }

    if (callbackId === CONSTANTS.SHORT_CUT_CALLBACK_ID.CHECK_BAG) {
      const getUserRequestInfo = await userService.findOrCreate(userIdRequest);

      modal.view = checkBagTemplate(
        getUserRequestInfo.give_bag,
        getUserRequestInfo.receive_bag
      );

      web.views.open(modal);
    }

    if (callbackId === CONSTANTS.SHORT_CUT_CALLBACK_ID.GIFT_EXCHANGE) {
      const gifts = await giftService.getGiftsList();

      if (!gifts.rows.length) {
        res.status(400).end();

        return;
      }

      const filterGift = gifts.rows.filter(gift => gift.quantity > 0);

      const radioOptions = filterGift.map((gift) => {
        const text = `*${gift.name}*\n_số lượng còn lại: ${gift.quantity}_\n_Số bimbim cần đổi: ${gift.points}_`;

        return {
          value: gift.id.toString(),
          text: {
            type: 'mrkdwn',
            text
          }
        }
      });

      modal.view = giftExchangeTemplate(radioOptions);

      web.views.open(modal);
    }

    if (callbackId === CONSTANTS.SHORT_CUT_CALLBACK_ID.INFORMATION) {
      modal.view = generalTemplate(CONSTANTS.MESSAGES.INFORMATION);

      web.views.open(modal);
    }
  }
};

const handleDataSubmit = async (req, res) => {
  if (!req.body.payload) {
    res.status(400).end();
    return;
  }

  const payload = JSON.parse(req.body.payload);

  const slackView = payload.view;

  if (slackView) {
    const cbId = slackView.callback_id;

    if (cbId === CONSTANTS.MODAL_CALLBACK_ID.GIVE) {
      const giftTransaction = await userService.updateUserBag(payload);

      if (giftTransaction && giftTransaction.error) {
        res.status(400).end();

        return;
      }
    }

    if (cbId === CONSTANTS.MODAL_CALLBACK_ID.GIFT_CLAIM) {
      userService.giftClaim(payload);
    }

    if (cbId === CONSTANTS.MODAL_CALLBACK_ID.GIFT_EXCHANGE) {
      giftExchangeService.giftExchange(payload);
    }
  }
};

const handleInteractiveFromSlack = (req, res) => {
  showModal(req, res);
  handleDataSubmit(req, res);
};

module.exports = handleInteractiveFromSlack;
