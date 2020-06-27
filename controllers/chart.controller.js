const chartService = require('../services/chart.service');

const getTopUserHasHighestPoints = async (req, res) => {
  const users = await chartService.getTopUserHasHighestPoints();

  if (users && users.error) {
    res.status(400).json({ message: users.error });

    return;
  }

  res.status(200).json(users);
};

module.exports = {
  getTopUserHasHighestPoints
};
