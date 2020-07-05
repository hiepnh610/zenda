const chartService = require('../services/chart.service');

const getTopUserHasHighestPoints = async (req, res) => {
  const users = await chartService.getTopUserHasHighestPoints();

  if (users && users.error) {
    res.status(400).json({ message: users.error });

    return;
  }

  res.status(200).json(users);
};

const getTopGivePointsUser = async (req, res) => {
  const transactions = await chartService.getTopGivePointsUser();

  if (transactions && transactions.error) {
    res.status(400).json({ message: transactions.error });

    return;
  }

  res.status(200).json(transactions);
};

module.exports = {
  getTopUserHasHighestPoints,
  getTopGivePointsUser
};
