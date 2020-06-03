const express = require('express');
const router  = express.Router();

const interactive = require('./interactive');
const user = require('./users');
const gift = require('./gift');
const transactions = require('./transactions');
const settings = require('./settings');

router
  .route('/interactive')
  .post(interactive.handleInteractiveFromSlack);

router
  .route('/users')
  .get(user.getUserList);

router
  .route('/user/:id')
  .delete(user.deleteUser);

router
  .route('/gifts')
  .get(gift.getGifts);

router
  .route('/gift/:id')
  .delete(gift.deleteGift);

router
  .route('/transactions')
  .get(transactions.getTransactions);

router
  .route('/settings')
  .put(settings.resetPoints);

module.exports = router;
