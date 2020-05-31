const express = require('express');
const router  = express.Router();

const interactive = require('./interactive');
const user = require('./users');

router
  .route('/interactive')
  .post(interactive.handleInteractiveFromSlack);

router
  .route('/users')
  .get(user.getUserList);

module.exports = router;
