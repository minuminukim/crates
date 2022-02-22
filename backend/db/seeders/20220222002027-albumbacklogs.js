'use strict';
const generateAlbumBacklogs = require('../../utils/generateAlbumBacklogSeed');

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert('AlbumBacklogs', [
      {
        backlogID: 1,
        albumID: 12,
      },
      {
        backlogID: 1,
        albumID: 13,
      },
      {
        backlogID: 1,
        albumID: 14,
      },
      {
        backlogID: 1,
        albumID: 15,
      },
      {
        backlogID: 1,
        albumID: 16,
      },
      {
        backlogID: 1,
        albumID: 17,
      },
      {
        backlogID: 1,
        albumID: 18,
      },
      {
        backlogID: 1,
        albumID: 8,
      },
      {
        backlogID: 1,
        albumID: 19,
      },
      {
        backlogID: 1,
        albumID: 20,
      },
      {
        backlogID: 2,
        albumID: 20,
      },
      {
        backlogID: 2,
        albumID: 4,
      },
      {
        backlogID: 2,
        albumID: 6,
      },
      {
        backlogID: 2,
        albumID: 7,
      },
      {
        backlogID: 2,
        albumID: 9,
      },
      {
        backlogID: 2,
        albumID: 11,
      },
      {
        backlogID: 2,
        albumID: 13,
      },
      {
        backlogID: 3,
        albumID: 13,
      },
      {
        backlogID: 3,
        albumID: 1,
      },
      {
        backlogID: 3,
        albumID: 3,
      },
      {
        backlogID: 3,
        albumID: 6,
      },
      {
        backlogID: 3,
        albumID: 7,
      },
      {
        backlogID: 3,
        albumID: 8,
      },
      {
        backlogID: 3,
        albumID: 22,
      },
      {
        backlogID: 3,
        albumID: 23,
      },
    ]);
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
