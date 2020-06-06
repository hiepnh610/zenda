const express = require('express');
const router  = express.Router();

const user = require('../controllers/user.controller');

// router
//   .route('/interactive')
//   .post(interactive.handleInteractiveFromSlack);

router
  .route('/users')
  .get(user.create);

// router
//   .route('/user/:id')
//   .delete(user.deleteUser);

// router
//   .route('/gifts')
//   .get(gift.getGifts);

// router
//   .route('/gift/:id')
//   .delete(gift.deleteGift);

// router
//   .route('/transactions')
//   .get(transactions.getTransactions);

// router
//   .route('/settings')
//   .put(settings.resetPoints);

module.exports = router;
