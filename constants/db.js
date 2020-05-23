const localDb = 'mongodb://localhost:27017/zenda';
const MONGODB_URI = process.env.MONGODB_URI || localDb;

module.exports = {
  MONGODB_URI
};
