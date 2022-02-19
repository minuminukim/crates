'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert(
      'AlbumLists',
      [
        {
          listID: 1,
          albumID: 4,
          listIndex: 0,
        },
        {
          listID: 1,
          albumID: 3,
          listIndex: 1,
        },
        {
          listID: 1,
          albumID: 5,
          listIndex: 2,
        },
        {
          listID: 1,
          albumID: 9,
          listIndex: 3,
        },
        {
          listID: 1,
          albumID: 1,
          listIndex: 4,
        },
        {
          listID: 1,
          albumID: 8,
          listIndex: 5,
        },
        {
          listID: 1,
          albumID: 6,
          listIndex: 6,
        },
        {
          listID: 1,
          albumID: 10,
          listIndex: 7,
        },
        {
          listID: 1,
          albumID: 2,
          listIndex: 8,
        },
        {
          listID: 1,
          albumID: 7,
          listIndex: 9,
        },
        //
        {
          listID: 3,
          albumID: 2,
          listIndex: 0,
        },
        {
          listID: 3,
          albumID: 1,
          listIndex: 1,
        },
        {
          listID: 3,
          albumID: 4,
          listIndex: 2,
        },
        {
          listID: 3,
          albumID: 7,
          listIndex: 3,
        },
        {
          listID: 3,
          albumID: 3,
          listIndex: 4,
        },
        {
          listID: 3,
          albumID: 8,
          listIndex: 5,
        },
        {
          listID: 3,
          albumID: 5,
          listIndex: 6,
        },
        {
          listID: 3,
          albumID: 10,
          listIndex: 7,
        },
        {
          listID: 3,
          albumID: 9,
          listIndex: 8,
        },
        {
          listID: 3,
          albumID: 6,
          listIndex: 9,
        },
        //
        {
          listID: 4,
          albumID: 3,
          listIndex: 0,
        },
        {
          listID: 4,
          albumID: 5,
          listIndex: 1,
        },
        {
          listID: 4,
          albumID: 6,
          listIndex: 2,
        },
        {
          listID: 4,
          albumID: 4,
          listIndex: 3,
        },
        {
          listID: 4,
          albumID: 8,
          listIndex: 4,
        },
        {
          listID: 4,
          albumID: 1,
          listIndex: 5,
        },
        {
          listID: 4,
          albumID: 2,
          listIndex: 6,
        },
        {
          listID: 4,
          albumID: 10,
          listIndex: 7,
        },
        {
          listID: 4,
          albumID: 9,
          listIndex: 8,
        },
        {
          listID: 4,
          albumID: 7,
          listIndex: 9,
        },
        //
        {
          listID: 2,
          albumID: 11,
        },
        {
          listID: 2,
          albumID: 12,
        },
        {
          listID: 2,
          albumID: 13,
        },
        {
          listID: 2,
          albumID: 14,
        },
        {
          listID: 2,
          albumID: 15,
        },
        {
          listID: 2,
          albumID: 16,
        },
        {
          listID: 2,
          albumID: 17,
        },
        {
          listID: 2,
          albumID: 18,
        },
        {
          listID: 2,
          albumID: 19,
        },
        {
          listID: 2,
          albumID: 20,
        },
        //
        {
          listID: 5,
          albumID: 21,
        },
        {
          listID: 5,
          albumID: 22,
        },
        {
          listID: 5,
          albumID: 23,
        },
        {
          listID: 5,
          albumID: 24,
        },
        {
          listID: 5,
          albumID: 25,
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
