const express     = require('express');
const app         = express();
const http        = require('http').Server(app);
const bodyParser  = require('body-parser');
const mongoose    = require('mongoose');
const morgan      = require('morgan');

const route = require('./api');
const CONSTANTS = require('./constants');

mongoose.connect(
  CONSTANTS.MONGODB_URI,
  CONSTANTS.MONGODB_OPTIONS
);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', route);

http.listen(CONSTANTS.PORT, () => {
  console.log(`This app listen on port ${CONSTANTS.PORT}`);
});
