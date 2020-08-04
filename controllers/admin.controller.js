const request = require('request');

const adminService = require('../services/admin.service');

const login = async (req, res) => {
  const {
    username,
    password,
    captchaToken
  } = req.body;

  if (!username) {
    res.status(400).json({ message: 'Username cannot be blank.' });

    return;
  }

  if (!password) {
    res.status(400).json({ message: 'Password cannot be blank.' });

    return;
  }

  if (!captchaToken) {
    res.status(400).json({ message: 'Captcha cannot be blank.' });

    return;
  }

  const secretKey = process.env.GOOGLE_CAPTCHA_SECRET_KEY;
  const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captchaToken}`;

  request(verificationUrl, async (error, response, body) => {
    body = JSON.parse(body);

    if (body.success !== undefined && !body.success) {
      res.status(400).json({ message: 'Failed captcha verification.' });

      return;
    }

    const userInfo = await adminService.login({
      username,
      password
    });

    if (!userInfo) {
      res.status(400).json({ message: 'Error happened.' });

      return;
    }

    if (userInfo && userInfo.error) {
      res.status(400).json({ message: userInfo.error });

      return;
    }

    res.status(200).json(userInfo);
  });
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

  res.status(200).json(userInfo);
};

module.exports = {
  login,
  getAdminInfo
};
