'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert(
      'UserAlbums',
      [
        {
          userID: 1,
          albumID: 1,
        },
        {
          userID: 1,
          albumID: 2,
        },
        {
          userID: 1,
          albumID: 3,
        },
        {
          userID: 1,
          albumID: 4,
        },
        {
          userID: 1,
          albumID: 5,
        },
        {
          userID: 1,
          albumID: 6,
        },
        {
          userID: 1,
          albumID: 7,
        },
        {
          userID: 1,
          albumID: 8,
        },
        {
          userID: 1,
          albumID: 9,
        },
        {
          userID: 1,
          albumID: 25,
        },
        {
          userID: 1,
          albumID: 19,
        },
        {
          userID: 1,
          albumID: 20,
        },
        {
          userID: 2,
          albumID: 12,
        },
        {
          userID: 1,
          albumID: 20,
        },
        {
          userID: 2,
          albumID: 1,
        },
        {
          userID: 2,
          albumID: 21,
        },
        {
          userID: 2,
          albumID: 22,
        },
        {
          userID: 2,
          albumID: 23,
        },
        {
          userID: 2,
          albumID: 24,
        },
        {
          userID: 2,
          albumID: 12,
        },
        {
          userID: 3,
          albumID: 25,
        },
        {
          userID: 3,
          albumID: 1,
        },
        {
          userID: 3,
          albumID: 3,
        },
        {
          userID: 3,
          albumID: 10,
        },
        {
          userID: 3,
          albumID: 12,
        },
        {
          userID: 3,
          albumID: 13,
        },
        {
          userID: 3,
          albumID: 14,
        },
        {
          userID: 3,
          albumID: 15,
        },
        {
          userID: 3,
          albumID: 16,
        },
        {
          userID: 3,
          albumID: 17,
        },
        {
          userID: 3,
          albumID: 18,
        },
        {
          userID: 3,
          albumID: 19,
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
