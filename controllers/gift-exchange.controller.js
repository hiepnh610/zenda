const perf = require('execution-time')();

const giftExchangeService = require('../services/gift-exchange.service.js');
const UTILS = require('../utils');

const giftExchange = async (req, res) => {
  perf.start('apiCall');

  const logData = {};
  const {
    user_id,
    gift_id
  } = req.body;

  if (!user_id || !gift_id) {
    logData.execution_time = perf.stop('apiCall').words;
    logData.msg = "Error happened.";

    UTILS.logging.error(req, logData);

    res.status(400).end();

    return;
  }

  const payload = {
    user_id,
    gift_id
  };
  const exchange = await giftExchangeService.giftExchange(payload);

  if (exchange && exchange.error) {
    logData.execution_time = perf.stop('apiCall').words;
    logData.msg = exchange.error;

    UTILS.logging.error(req, logData);

    res.status(400).end();

    return;
  }

  logData.execution_time = perf.stop('apiCall').words;
  logData.msg = "Gift exchange successfully.";

  UTILS.logging.info(req, logData);
};

const giftExchangeList = async (req, res) => {
  perf.start('apiCall');

  const logData = {};
  const offset = req.query.offset;
  const limit = req.query.limit;

  if (!offset) {
    const message = 'Offset cannot be empty.';

    logData.execution_time = perf.stop('apiCall').words;
    logData.msg = message;

    UTILS.logging.error(req, logData);

    return res.status(400).json({ message: 'Offset cannot be empty.' });
  }

  if (!limit) {
    const message = 'Limit cannot be empty.';

    logData.execution_time = perf.stop('apiCall').words;
    logData.msg = message;

    UTILS.logging.error(req, logData);

    return res.status(400).json({ message: 'Limit cannot be empty.' });
  }

  const exchangeList = await giftExchangeService.giftExchangeList(offset, limit);

  if (exchangeList && exchangeList.error) {
    logData.execution_time = perf.stop('apiCall').words;
    logData.msg = exchangeList.error;

    UTILS.logging.error(req, logData);
    res.status(400).json(exchangeList.error);

    return;
  }

  logData.execution_time = perf.stop('apiCall').words;
  logData.msg = "Get gift exchange list successfully.";

  UTILS.logging.info(req, logData);

  res.status(200).json(exchangeList);
};

const giftExchangeStatus = async (req, res) => {
  perf.start('apiCall');

  const logData = {};
  const { id } = req.params;
  const { status } = req.body;

  if (!id) {
    logData.execution_time = perf.stop('apiCall').words;
    logData.msg = "Cannot get gift id.";

    UTILS.logging.error(req, logData);
    res.status(400).json({ message: 'Cannot get gift id.' });

    return;
  }

  if (status === null || status === undefined) {
    logData.execution_time = perf.stop('apiCall').words;
    logData.msg = "Cannot get status.";

    UTILS.logging.error(req, logData);
    res.status(400).json({ message: 'Cannot get status.' });

    return;
  }

  const payload = { id, status };

  const giftExchangeUpdated = await giftExchangeService.giftExchangeStatus(payload);

  if (giftExchangeUpdated && giftExchangeUpdated.error) {
    logData.execution_time = perf.stop('apiCall').words;
    logData.msg = giftExchangeUpdated.error;

    UTILS.logging.error(req, logData);

    res.status(400).json(giftExchangeUpdated.error);

    return;
  }

  logData.execution_time = perf.stop('apiCall').words;
  logData.msg = "Change gift exchange status successfully.";

  UTILS.logging.info(req, logData);

  res.status(200).json(giftExchangeUpdated);
};

const removeGiftExchange = async (req, res) => {
  perf.start('apiCall');

  const logData = {};
  const { id } = req.params;

  if (!id) {
    logData.execution_time = perf.stop('apiCall').words;
    logData.msg = "Cannot get gift exchange id.";

    UTILS.logging.error(req, logData);

    res.status(400).json({ message: 'Cannot get gift exchange id.' });
  }

  const giftExchange = await giftExchangeService.removeGiftExchange(id);

  logData.execution_time = perf.stop('apiCall').words;
  logData.msg = "Delete gift exchange successfully.";

  UTILS.logging.info(req, logData);

  res.status(200).json(giftExchange);
};

module.exports = {
  giftExchange,
  giftExchangeList,
  giftExchangeStatus,
  removeGiftExchange
};
