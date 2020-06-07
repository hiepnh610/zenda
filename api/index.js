const express = require('express');
const router  = express.Router();

const interactive = require('../controllers/interactive.controller');

router
  .route('/interactive')
  .post(interactive);

// router
//   .route('/users')
//   .get(user.findOrCreate);

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
