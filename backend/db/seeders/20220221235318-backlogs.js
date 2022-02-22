'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Backlogs',
      [
        {
          userID: 1,
        },
        { userID: 2 },
        { userID: 3 },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Backlogs', null, {});
  },
};
