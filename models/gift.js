'use strict';
module.exports = (sequelize, DataTypes) => {
  const Gift = sequelize.define('Gift', {
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    points: DataTypes.INTEGER
  }, {});
  Gift.associate = function(models) {
    // associations can be defined here
  };
  return Gift;
};