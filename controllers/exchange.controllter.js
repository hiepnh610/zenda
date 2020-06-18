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

module.exports = {
  giftExchange
};
