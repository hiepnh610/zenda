const perf = require('execution-time')();

const giftService = require('../services/gift.service');
const UTILS = require('../utils');

const getGiftsList = async (req, res) => {
  perf.start('apiCall');

  const logData = {};
  const offset = req.query.offset || '';

  const gifts = await giftService.getGiftsList(offset);

  if (!gifts) {
    logData.execution_time = perf.stop('apiCall').words;
    logData.msg = "Error happened.";

    UTILS.logging.error(req, logData);

    res.status(400).json({ message: 'Error happened.' });

    return;
  }

  if (gifts && gifts.error) {
    logData.execution_time = perf.stop('apiCall').words;
    logData.msg = gifts.error;

    UTILS.logging.error(req, logData);

    res.status(400).json({ message: gifts.error });

    return;
  }

  logData.execution_time = perf.stop('apiCall').words;
  logData.msg = "Get gifts list successfully.";

  UTILS.logging.info(req, logData);

  res.status(200).json(gifts);
};

const createGift = async (req, res) => {
  perf.start('apiCall');

  const logData = {};
  const payload = req.body.payload;

  if (!payload) {
    logData.execution_time = perf.stop('apiCall').words;
    logData.msg = 'Cannot get gift information.';

    UTILS.logging.error(req, logData);

    res.status(400).send({
      message: 'Cannot get gift information.'
    });

    return;
  }

  const gift = await giftService.createGift(payload);

  if (!gift) {
    logData.execution_time = perf.stop('apiCall').words;
    logData.msg = 'Error happened.';

    UTILS.logging.error(req, logData);

    res.status(400).json({ message: 'Error happened.' });

    return;
  }

  if (gift && gift.error) {
    logData.execution_time = perf.stop('apiCall').words;
    logData.msg = gift.error;

    UTILS.logging.error(req, logData);

    res.status(400).json({ message: gift.error });

    return;
  }

  logData.execution_time = perf.stop('apiCall').words;
  logData.msg = "Create gift successfully.";

  UTILS.logging.info(req, logData);

  res.status(201).json(gift);
};

const updateGift = async (req, res) => {
  perf.start('apiCall');

  const logData = {};
  const id = req.params.id;
  const {
    name,
    image,
    quantity,
    points
  } = req.body;

  if (!id) {
    logData.execution_time = perf.stop('apiCall').words;
    logData.msg = "Cannot get gift information.";

    UTILS.logging.error(req, logData);

    res.status(400).json({ message: 'Cannot get gift information.' });

    return;
  }

  if (!name) {
    logData.execution_time = perf.stop('apiCall').words;
    logData.msg = "Cannot get name gift.";

    UTILS.logging.error(req, logData);

    res.status(400).json({ message: 'Cannot get name gift.' });

    return;
  }

  if (!image) {
    logData.execution_time = perf.stop('apiCall').words;
    logData.msg = "Cannot get image gift.";

    UTILS.logging.error(req, logData);

    res.status(400).json({ message: 'Cannot get image gift.' });

    return;
  }

  if (!quantity) {
    logData.execution_time = perf.stop('apiCall').words;
    logData.msg = "Cannot get quantity gift.";

    UTILS.logging.error(req, logData);

    res.status(400).json({ message: 'Cannot get quantity gift.' });

    return;
  }

  if (!points) {
    logData.execution_time = perf.stop('apiCall').words;
    logData.msg = "Cannot get points gift.";

    UTILS.logging.error(req, logData);

    res.status(400).json({ message: 'Cannot get points gift.' });

    return;
  }

  const payload = {
    id,
    name,
    image,
    quantity,
    points
  };

  const gift = await giftService.updateGift(payload);

  if (gift && gift.error) {
    logData.execution_time = perf.stop('apiCall').words;
    logData.msg = gift.error;

    UTILS.logging.error(req, logData);

    res.status(400).json({ message: gift.error });

    return;
  }

  logData.execution_time = perf.stop('apiCall').words;
  logData.msg = "Update gift successfully.";

  UTILS.logging.info(req, logData);

  res.status(200).json(gift);
};

const getGiftDetail = async (req, res) => {
  perf.start('apiCall');

  const logData = {};
  const id = req.params.id;

  if (!id) {
    logData.execution_time = perf.stop('apiCall').words;
    logData.msg = 'Cannot get gift information.';

    UTILS.logging.error(req, logData);

    res.status(400).json({ message: 'Cannot get gift information.' });

    return;
  }

  const gift = await giftService.getGiftDetail(id);

  if (gift && gift.error) {
    logData.execution_time = perf.stop('apiCall').words;
    logData.msg = gift.error;

    UTILS.logging.error(req, logData);

    res.status(400).json({ message: gift.error });

    return;
  }

  logData.execution_time = perf.stop('apiCall').words;
  logData.msg = "Get gift detail successfully.";

  UTILS.logging.info(req, logData);

  res.status(200).json(gift);
};

module.exports = {
  getGiftsList,
  createGift,
  updateGift,
  getGiftDetail
};
