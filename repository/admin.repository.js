const DB = require("../models");
const Admin = DB.Admin;

const getAdminInfo = async (payload) => {
  const {
    user_name,
    password
  } = payload;
  const query = { user_name };

  const admin = await Admin.findOne({ where: query });

  console.log('admin', admin._modelOptions.instanceMethods.validPassword(password));

  return admin;
};

module.exports = {
  getAdminInfo
};
