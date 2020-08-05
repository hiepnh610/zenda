const request = require('request');
const perf = require('execution-time')();

const adminService = require('../services/admin.service');
const UTILS = require('../utils');

const login = async (req, res) => {
  perf.start('apiCall');

  const logData = {};

  const {
    username,
    password,
    captchaToken
  } = req.body;

  if (!username) {
    logData.execution_time = perf.stop('apiCall').words;
    logData.msg = "Username cannot be blank.";

    UTILS.logging.error(req, logData);

    res.status(400).json({ message: 'Username cannot be blank.' });

    return;
  }

  if (!password) {
    logData.execution_time = perf.stop('apiCall').words;
    logData.msg = "Password cannot be blank.";

    UTILS.logging.error(req, logData);

    res.status(400).json({ message: 'Password cannot be blank.' });

    return;
  }

  if (!captchaToken) {
    logData.execution_time = perf.stop('apiCall').words;
    logData.msg = "Captcha cannot be blank.";

    UTILS.logging.error(req, logData);

    res.status(400).json({ message: 'Captcha cannot be blank.' });

    return;
  }

  const secretKey = process.env.GOOGLE_CAPTCHA_SECRET_KEY;
  const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captchaToken}`;

  request(verificationUrl, async (error, response, body) => {
    body = JSON.parse(body);

    if (body.success !== undefined && !body.success) {
      logData.execution_time = perf.stop('apiCall').words;
      logData.msg = "Failed captcha verification.";

      UTILS.logging.error(req, logData);

      res.status(400).json({ message: 'Failed captcha verification.' });

      return;
    }

    const userInfo = await adminService.login({
      username,
      password
    });

    if (!userInfo) {
      logData.execution_time = perf.stop('apiCall').words;
      logData.msg = "Error happened.";

      UTILS.logging.error(req, logData);

      res.status(400).json({ message: 'Error happened.' });

      return;
    }

    if (userInfo && userInfo.error) {
      logData.execution_time = perf.stop('apiCall').words;
      logData.msg = userInfo.error;

      UTILS.logging.error(req, logData);

      res.status(400).json({ message: userInfo.error });

      return;
    }

    logData.execution_time = perf.stop('apiCall').words;
    logData.msg = "Login successfully.";

    UTILS.logging.info(req, logData);

    res.status(200).json(userInfo);
  });
};

const getAdminInfo = async (req, res) => {
  perf.start('apiCall');

  const logData = {};

  const { username } = req;

  if (!username) {
    logData.execution_time = perf.stop('apiCall').words;
    logData.msg = "Cannot get username.";

    UTILS.logging.error(req, logData);

    res.status(400).json({ message: 'Cannot get username.' });

    return;
  }

  const userInfo = await adminService.getAdminInfo({ username });

  if (!userInfo) {
    logData.execution_time = perf.stop('apiCall').words;
    logData.msg = "Error happened.";

    UTILS.logging.error(req, logData);

    res.status(400).json({ message: 'Error happened.' });

    return;
  }

  if (userInfo && userInfo.error) {
    logData.execution_time = perf.stop('apiCall').words;
    logData.msg = userInfo.error;

    UTILS.logging.error(req, logData);

    res.status(400).json({ message: userInfo.error });

    return;
  }

  logData.execution_time = perf.stop('apiCall').words;
  logData.msg = "Get admin information successfully.";

  UTILS.logging.info(req, logData);

  res.status(200).json(userInfo);
};

module.exports = {
  login,
  getAdminInfo
};
