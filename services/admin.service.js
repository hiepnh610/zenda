const DB = require("../models");
const Admin = DB.Admin;

const adminRepository = require('../repository/admin.repository');

const login = async (payload) => {
  const adminInfo = await adminRepository.getAdminInfo(payload);

  return adminInfo;
};

module.exports = {
  login
};
