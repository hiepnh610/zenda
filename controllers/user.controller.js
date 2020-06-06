const userService = require('../services/user.service');

exports.findOrCreate = async (req, res) => {
  const userId = req.body.user_id;

  if (!userId) {
    res.status(400).send({
      message: "Cannot get user id."
    });

    return;
  }

  const userInfo = await userService.findOrCreate(userId);

  if (userInfo.error) {
    res.status(400).json({ message: userInfo.error });

    return;
  }

  res.status(200).json(userInfo);
};
