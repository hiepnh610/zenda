const express = require('express');
const router  = express.Router();

const interactive = require('../controllers/interactive.controller');
const user = require('../controllers/user.controller');
const transaction = require('../controllers/transaction.controller');

router
  .route('/interactive')
  .post(interactive);

router
  .route('/users')
  .get(user.getUserList);

// router
//   .route('/user/:id')
//   .delete(user.deleteUser);

// router
//   .route('/gifts')
//   .get(gift.getGifts);

// router
//   .route('/gift/:id')
//   .delete(gift.deleteGift);

router
  .route('/transactions')
  .get(transaction.getTransactionList);

// router
//   .route('/settings')
//   .put(settings.resetPoints);

module.exports = router;
