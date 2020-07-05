'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'Exchanges',
        'user_request_id',
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
      )
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Exchanges', 'user_request_id')
    ]);
  }
};
