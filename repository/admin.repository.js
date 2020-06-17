const DB = require("../models");
const Admin = DB.Admin;

const getAdminInfo = async (payload) => {
  try {
    const { username } = payload;

    return await Admin.findOne({ where: { username } });
  } catch (error) {
    return { error };
  }
};

module.exports = {
  getAdminInfo
};
