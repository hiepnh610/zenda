'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    user_id: DataTypes.STRING,
    give_bag: DataTypes.INTEGER,
    receive_bag: DataTypes.INTEGER,
    display_name: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};