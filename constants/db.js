const localDb = 'mongodb://localhost:27017/zenda';
const MONGODB_URI = process.env.MONGODB_URI || localDb;
const MONGODB_OPTIONS = {
  keepAlive: true,
  socketTimeoutMS: 0,
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
};

module.exports = {
  MONGODB_URI,
  MONGODB_OPTIONS
};
