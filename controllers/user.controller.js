const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

const userService = require('../services/user.service');

exports.create = (req, res) => {
  const userId = req.body.user_id;

  if (!userId) {
    res.status(400).send({
      message: "Cannot get user id."
    });

    return;
  }

  return userService
    .create(userId)
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((e) => {
      res.status(500).json({
        message: e.message || 'Something wrong!'
      });
    });
};
