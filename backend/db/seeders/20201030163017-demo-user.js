'use strict';
const bcrypt = require('bcryptjs');
const { seedPassword } = require('../../config');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          email: 'demo@crates.io',
          username: 'demo',
          hashedPassword: bcrypt.hashSync(seedPassword),
        },
        {
          email: 'elazar@crates.io',
          username: 'elazar',
          hashedPassword: bcrypt.hashSync(seedPassword),
        },
        {
          email: 'callum@crates.io',
          username: 'callum',
          hashedPassword: bcrypt.hashSync(seedPassword),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      'Users',
      {
        username: { [Op.in]: ['demo', 'elazar', 'callum'] },
      },
      {}
    );
  },
};
