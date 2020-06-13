const userService = require('../services/user.service');

const getUserList = async (req, res) => {
  const users = await userService.getUserList();

  if (users && users.error) {
    res.status(400).json({ message: users.error });

    return;
  }

  res.status(200).json(users);
};

module.exports = {
  getUserList
};
