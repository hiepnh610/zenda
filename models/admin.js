'use strict';

const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define('Admin', {
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    instanceMethods: {
      validPassword: function (password, hash) {
        return bcrypt.compareSync(password, hash);
      }
    }
  });

  Admin.associate = function(models) {
    // associations can be defined here
  };

  return Admin;
};