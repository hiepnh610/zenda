const userRepository = require('../repository/user.repository');

const getTopUserHasHighestPoints = async () => {
  return await userRepository.getTopUserHasHighestPoints();
};

module.exports = {
  getTopUserHasHighestPoints
};
