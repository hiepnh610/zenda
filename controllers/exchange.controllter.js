const exchangeService = require('../services/exchange.service.js');

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
  const exchange = await exchangeService.giftExchange(payload);

  if (exchange && exchange.error) {
    res.status(400).end();

    return;
  }
};

const exchangeList = async (req, res) => {
  const exchangeList = await exchangeService.exchangeList();

  if (exchangeList && exchangeList.error) {
    res.status(400).json(exchangeList.error);

    return;
  }

  res.status(200).json(exchangeList);
};

const exchangeStatus = async (req, res) => {
  const { gift_id } = req.params;
  const {
    user_id,
    status
  } = req.body;

  if (!gift_id) {
    res.status(400).json({ message: 'Cannot get gift information.' });

    return;
  }

  if (!user_id) {
    res.status(400).json({ message: 'Cannot get user information.' });

    return;
  }

  if (!status) {
    res.status(400).json({ message: 'Cannot get status.' });

    return;
  }

  res.status(200).json({ message: 'Update Successfully.' });
};

module.exports = {
  giftExchange,
  exchangeList,
  exchangeStatus
};
