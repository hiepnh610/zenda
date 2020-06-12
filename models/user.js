'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    user_id: DataTypes.STRING,
    display_name: DataTypes.STRING,
    give_bag: DataTypes.INTEGER,
    receive_bag: DataTypes.INTEGER
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};