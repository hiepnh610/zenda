const userService = require('../services/user.service');

const getUserList = async (req, res) => {
  const offset = req.query.offset || '';

  const users = await userService.getUserList(offset);

  if (!users) {
    res.status(400).json({ message: 'Error happened.' });

    return;
  }

  if (users && users.error) {
    res.status(400).json({ message: users.error });

    return;
  }

  res.status(200).json(users);
};

const updatePointsAllUser = async () => {
  return await userService.updatePointsAllUser();
};

const updateUserName = async () => {
  await userService.updateUserName();
};

module.exports = {
  getUserList,
  updatePointsAllUser,
  updateUserName
};
