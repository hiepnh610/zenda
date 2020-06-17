const adminService = require('../services/admin.service');

const login = async (req, res) => {
  const {
    username,
    password
  } = req.body;

  if (!username) {
    res.status(400).json({ message: 'Username cannot be blank.' });

    return;
  }

  if (!password) {
    res.status(400).json({ message: 'Password cannot be blank.' });

    return;
  }

  const userInfo = await adminService.login({ username, password });

  if (!userInfo) {
    res.status(400).json({ message: 'Error happened.' });

    return;
  }

  if (userInfo && userInfo.error) {
    res.status(400).json({ message: userInfo.error });

    return;
  }

  res.status(200).json(userInfo);
};

const getAdminInfo = async (req, res) => {
  const { username } = req;

  if (!username) {
    res.status(400).json({ message: 'Cannot get username.' });

    return;
  }

  const userInfo = await adminService.getAdminInfo({ username });

  if (!userInfo) {
    res.status(400).json({ message: 'Error happened.' });

    return;
  }

  if (userInfo && userInfo.error) {
    res.status(400).json({ message: userInfo.error });

    return;
  }

  console.log('userInfo', userInfo);

  res.status(200).json(userInfo);
};

module.exports = {
  login,
  getAdminInfo
};
