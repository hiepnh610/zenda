'use strict';
module.exports = (sequelize, DataTypes) => {
  const Exchange = sequelize.define('Exchange', {
    user_id: DataTypes.STRING,
    gift_id: DataTypes.STRING
  }, {});
  Exchange.associate = function(models) {
    // associations can be defined here
  };
  return Exchange;
};