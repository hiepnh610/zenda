'use strict';
module.exports = (sequelize, DataTypes) => {
  const Exchange = sequelize.define('Exchange', {
    display_name: DataTypes.STRING,
    gift_name: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {});
  Exchange.associate = function(models) {
    // associations can be defined here
  };
  return Exchange;
};