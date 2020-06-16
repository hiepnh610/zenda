const adminService = require('../services/admin.service');

const login = async (req, res) => {
  const username = req.body.user_name;
  const password = req.body.password;

  if (!username) {
    res.status(400).json({ message: 'Username cannot be blank.' });

    return;
  }

  if (!password) {
    res.status(400).json({ message: 'Password cannot be blank.' });

    return;
  }

  const payload = {
    user_name: username,
    password
  };

  const userInfo = await adminService.login(payload);

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

module.exports = {
  login
};
