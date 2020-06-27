const giftExchangeService = require('../services/gift-exchange.service.js');

const giftExchange = async (req, res) => {
  const {
    user_id,
    gift_id
  } = req.body;

  if (!user_id || !gift_id) {
    res.status(400).end();

    return;
  }

  const payload = {
    user_id,
    gift_id
  };
  const exchange = await giftExchangeService.giftExchange(payload);

  if (exchange && exchange.error) {
    res.status(400).end();

    return;
  }
};

const giftExchangeList = async (req, res) => {
  const offset = req.query.offset || '';

  const exchangeList = await giftExchangeService.giftExchangeList(offset);

  if (exchangeList && exchangeList.error) {
    res.status(400).json(exchangeList.error);

    return;
  }

  res.status(200).json(exchangeList);
};

const giftExchangeStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!id) {
    res.status(400).json({ message: 'Cannot get gift id.' });

    return;
  }

  if (status === null || status === undefined) {
    res.status(400).json({ message: 'Cannot get status.' });

    return;
  }

  const payload = { id, status };

  const giftExchangeUpdated = await giftExchangeService.giftExchangeStatus(payload);

  if (giftExchangeUpdated && giftExchangeUpdated.error) {
    res.status(400).json(giftExchangeUpdated.error);

    return;
  }

  res.status(200).json(giftExchangeUpdated);
};

const removeGiftExchange = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ message: 'Cannot get gift exchange id.' });
  }

  const giftExchange = await giftExchangeService.removeGiftExchange(id);

  res.status(200).json(giftExchange);
};

module.exports = {
  giftExchange,
  giftExchangeList,
  giftExchangeStatus,
  removeGiftExchange
};
