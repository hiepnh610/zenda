const User = require('../models/users');

const resetPoints = (req, res) => {
  const quantity = req.body.quantity;

  if (req.body.quantity) {
    User.updateMany(
      {},
      {
        $set: { give_bag: quantity, receive_bag: 0 },
      },
      { multi: true },
      (e) => {
        if (e) return res.status(400).json(e);

        res.status(200).json({ message: 'Done' });
      }
    );
  }
};

module.exports = {
  resetPoints,
};
