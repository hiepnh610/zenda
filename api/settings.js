const User = require('../models/users');

const resetPoints = (req, res) => {
  User.updateMany(
    {},
    {
      $set: { give_bag: 10, receive_bag: 0 },
    },
    { multi: true },
    (e) => {
      if (e) return res.status(400).json(e);

      res.status(200).json({ message: 'Done' });
    }
  );
};

module.exports = {
  resetPoints,
};
