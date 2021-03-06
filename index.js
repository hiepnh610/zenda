require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const morgan = require('morgan');
const RateLimit = require('express-rate-limit');
const cron = require('node-cron');

const db = require('./models');

const route = require('./api');
const CONSTANTS = require('./constants');

const userController = require('./controllers/user.controller');

const limiter = new RateLimit({
  windowMs: 1000,
  max: 10
});

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(limiter);

db.sequelize.sync();

app.use('/api', route);
app.get('/', (req, res) => {
  res.send('Hi, I am a bot!');
});

cron.schedule('0 0 1 * *', () => {
  userController.updatePointsAllUser();
}, {
  scheduled: true,
  timezone: 'Asia/Bangkok'
});

cron.schedule('0 0 * * *', () => {
  userController.updateUserName();

  console.log('-'.repeat(79));
  console.log('Update Username');
  console.log('-'.repeat(79));
}, {
  scheduled: true,
  timezone: 'Asia/Bangkok'
});

http.listen(CONSTANTS.PORT, () => {
  console.log(`This app listen on port ${CONSTANTS.PORT}`);
});
