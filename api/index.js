const express = require('express');
const router  = express.Router();

const interactive = require('./interactive');

router
  .route('/interactive')
  .post(interactive.handleInteractiveFromSlack);

module.exports = router;
