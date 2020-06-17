const DB = require("../models");
const Admin = DB.Admin;

const getAdminInfo = async (payload) => {
  const { user_name } = payload;

  return await Admin.findOne({ where: { user_name } });
};

module.exports = {
  getAdminInfo
};
