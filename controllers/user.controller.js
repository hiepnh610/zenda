const userService = require('../services/user.service');

const findOrCreate = async (userId) => {
  return await userService.findOrCreate(userId);
};

const updateUserBag = async (userRequestId, userReceiveId, quantity) => {
  await userService.findOrCreate(userReceiveId);

  return await userService.updateUserBag(userRequestId, userReceiveId, quantity);
};

module.exports = {
  findOrCreate,
  updateUserBag
};
