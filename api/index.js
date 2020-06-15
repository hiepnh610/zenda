const express = require('express');
const router  = express.Router();

const interactive = require('../controllers/interactive.controller');
const user = require('../controllers/user.controller');
const gift = require('../controllers/gift.controller');
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

router
  .route('/gifts')
  .get(gift.getGiftsList);

router
  .route('/gift')
  .post(gift.createGift);

router
  .route('/gift/:id')
  .get(gift.getGiftDetail);

router
  .route('/gift/:id')
  .put(gift.updateGift);

router
  .route('/gift/:id')
  .delete(gift.removeGift);

router
  .route('/transactions')
  .get(transaction.getTransactionList);

router
  .route('/transaction/:id')
  .delete(transaction.removeTransaction);

// router
//   .route('/settings')
//   .put(settings.resetPoints);

module.exports = router;
