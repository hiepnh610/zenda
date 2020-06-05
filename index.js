const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const morgan = require('morgan');

const db = require('./models');

// const route = require('./api');
const CONSTANTS = require('./constants');

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

db.sequelize.sync({ force: true }).then(function() {
  console.log('It worked!');
}, function (e) {
  console.log('An eor occurred while creating the table:', e);
});

// app.use('/api', route);

http.listen(CONSTANTS.PORT, () => {
  console.log(`This app listen on port ${CONSTANTS.PORT}`);
});
