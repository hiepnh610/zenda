const express = require('express');
const router  = express.Router();

const interactive = require('../controllers/interactive.controller');
const user = require('../controllers/user.controller');
const gift = require('../controllers/gift.controller');
const transaction = require('../controllers/transaction.controller');
const admin = require('../controllers/admin.controller');
const exchange = require('../controllers/gift-exchange.controller');
const chart = require('../controllers/chart.controller');
const auth = require('../auth');

router
  .route('/interactive')
  .post(interactive);

router
  .route('/login')
  .post(admin.login);

router
  .route('/admin')
  .get(auth.verifyToken, admin.getAdminInfo);

router
  .route('/users')
  .get(auth.verifyToken, user.getUserList);

router
  .route('/gifts')
  .get(auth.verifyToken, gift.getGiftsList);

router
  .route('/gift')
  .post(auth.verifyToken, gift.createGift);

router
  .route('/gift/:id')
  .get(auth.verifyToken, gift.getGiftDetail);

router
  .route('/gift/:id')
  .put(auth.verifyToken, gift.updateGift);

router
  .route('/transactions')
  .get(auth.verifyToken, transaction.getTransactionList);

router
  .route('/transaction/:id')
  .delete(auth.verifyToken, transaction.removeTransaction);

router
  .route('/gift-exchange')
  .get(auth.verifyToken, exchange.giftExchangeList);

router
  .route('/gift-exchange/:id')
  .put(auth.verifyToken, exchange.giftExchangeStatus);

router
  .route('/gift-exchange/:id')
  .delete(auth.verifyToken, exchange.removeGiftExchange);

router
  .route('/top-points')
  .get(auth.verifyToken, chart.getTopUserHasHighestPoints);

module.exports = router;
