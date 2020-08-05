const perf = require('execution-time')();

const chartService = require('../services/chart.service');
const UTILS = require('../utils');

const getTopUserHasHighestPoints = async (req, res) => {
  perf.start('apiCall');

  const users = await chartService.getTopUserHasHighestPoints();

  const logData = {
    "execution_time": perf.stop('apiCall').words
  };

  if (users && users.error) {
    res.status(400).json({ message: users.error });

    logData.msg = "Get users list for chart fail.";

    UTILS.logging.error(req, logData);

    return;
  }

  logData.msg = "Get users list for chart successfully.";

  UTILS.logging.info(req, logData);

  res.status(200).json(users);
};

const getTopGivePointsUser = async (req, res) => {
  perf.start('apiCall');

  const transactions = await chartService.getTopGivePointsUser();

  const logData = {
    "execution_time": perf.stop('apiCall').words
  };

  if (transactions && transactions.error) {
    res.status(400).json({ message: transactions.error });

    logData.msg = "Get transactions list for chart fail.";

    UTILS.logging.error(req, logData);

    return;
  }

  logData.msg = "Get transactions list for chart successfully.";

  UTILS.logging.info(req, logData);

  res.status(200).json(transactions);
};

module.exports = {
  getTopUserHasHighestPoints,
  getTopGivePointsUser
};
