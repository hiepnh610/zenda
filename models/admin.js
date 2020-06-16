'use strict';

const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define('Admin', {
    user_name: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    instanceMethods: {
      validPassword: function (password) {
        console.log('this', this);
        return bcrypt.compare(password, this.password);
      }
    }
  });
  Admin.associate = function(models) {
    // associations can be defined here
  };
  return Admin;
};