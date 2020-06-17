'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Admins', [{
      username: 'admin',
      password: '$2b$10$vraK4fne9uRm42tJOCNs7e5nOvVDbeBhXelWh.TuzlA4CE.bwLWr.',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Admins', null, {});
  }
};
