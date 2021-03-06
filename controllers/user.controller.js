const perf = require('execution-time')();

const userService = require('../services/user.service');
const UTILS = require('../utils');

const getUserList = async (req, res) => {
  perf.start('apiCall');

  const logData = {};

  const offset = req.query.offset;
  const limit = req.query.limit;
  const searchValue = req.query.display_name || ''

  if (!offset) {
    const message = 'Offset cannot be empty.';

    logData.execution_time = perf.stop('apiCall').words;
    logData.msg = message;

    UTILS.logging.error(req, logData);

    return res.status(400).json({ message: 'Offset cannot be empty.' });
  }

  if (!limit) {
    const message = 'Limit cannot be empty.';

    logData.execution_time = perf.stop('apiCall').words;
    logData.msg = message;

    UTILS.logging.error(req, logData);

    return res.status(400).json({ message: 'Limit cannot be empty.' });
  }

  const users = await userService.getUserList(offset, limit, searchValue);

  if (!users) {
    const message = 'Error happened.';

    logData.execution_time = perf.stop('apiCall').words;
    logData.msg = message;

    UTILS.logging.error(req, logData);

    return res.status(400).json({ message });
  }

  if (users && users.error) {
    logData.execution_time = perf.stop('apiCall').words;
    logData.msg = users.error;

    UTILS.logging.error(req, logData);

    return res.status(400).json({ message: users.error });
  }

  logData.execution_time = perf.stop('apiCall').words;
  logData.msg = "Get users list successfully";

  UTILS.logging.info(req, logData);

  return res.status(200).json(users);
};

const updatePointsAllUser = async () => {
  return await userService.updatePointsAllUser();
};

const updateUserName = async () => {
  await userService.updateUserName();
};

const getUserDetail = async (req, res) => {
  perf.start('apiCall');

  const logData = {};
  const id = req.params.id;

  if (!id) {
    logData.execution_time = perf.stop('apiCall').words;
    logData.msg = "Cannot get user information.";

    UTILS.logging.error(req, logData);

    res.status(400).json({ message: 'Cannot get user information.' });

    return;
  }

  const user = await userService.getUserDetail(id);

  if (user && user.error) {
    logData.execution_time = perf.stop('apiCall').words;
    logData.msg = user.error;

    UTILS.logging.error(req, logData);

    res.status(400).json({ message: user.error });

    return;
  }

  logData.execution_time = perf.stop('apiCall').words;
  logData.msg = "Get user detail successfully.";

  UTILS.logging.info(req, logData);

  res.status(200).json(user);
};

module.exports = {
  getUserList,
  updatePointsAllUser,
  updateUserName,
  getUserDetail
};
