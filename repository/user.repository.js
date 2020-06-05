const db = require("../models");
const User = db.users;

exports.create = (payload) => {
  return new Promise((resolve, reject) => {
    User
      .create(payload)
      .then((data) => {
        resolve(data);
      })
      .catch((e) => {
        return reject(e);
      });
  });
};
