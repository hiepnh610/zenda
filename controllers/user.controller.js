const userService = require('../services/user.service');

exports.findOrCreate = async (userId) => {
  return await userService.findOrCreate(userId);
};

exports.updateUserBag = async (userIdRequest, userIdReceive, quantity) => {
  return await userService.findOrCreate(userIdReceive);
};
