const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const morgan = require('morgan');
const RateLimit = require('express-rate-limit');

const db = require('./models');

const route = require('./api');
const CONSTANTS = require('./constants');

const limiter = new RateLimit({
  windowMs: 1000,
  max: 1
});

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(limiter);

db.sequelize.sync();

app.use('/api', route);

http.listen(CONSTANTS.PORT, () => {
  console.log(`This app listen on port ${CONSTANTS.PORT}`);
});
