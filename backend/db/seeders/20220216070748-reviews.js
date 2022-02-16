'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert(
      'Reviews',
      [
        {
          userID: 1,
          albumID: 1,
          body: '',
          listenedDate: new Date(2022, 1, 14),
          rating: 10,
          isRelisten: false,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
