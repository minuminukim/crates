'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert(
      'Lists',
      [
        {
          userID: 1,
          title: 'Kanye West',
          description: 'fight me',
          isRanked: true,
        },
        {
          userID: 1,
          title: 'albums that make me move',
          description: '',
          isRanked: false,
        },
        {
          userID: 2,
          title: 'Kanye West - Ranked',
          isRanked: true,
        },
        {
          userID: 3,
          title: 'The Definitive Kanye West Ranking',
          description: `Don't message me about this.`,
          isRanked: true,
        },
        {
          userID: 3,
          title: 'grip truck',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          isRanked: false,
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
