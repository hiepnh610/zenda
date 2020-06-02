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
  .route('/accounts')
  .get(user.getAccountList);

router
  .route('/gifts')
  .get(gift.getGifts);

router
  .route('/transactions')
  .get(transactions.getTransactions);

router
  .route('/settings')
  .put(settings.resetPoints);

module.exports = router;
