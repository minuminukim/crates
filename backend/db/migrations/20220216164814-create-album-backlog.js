'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AlbumBacklogs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      albumID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Albums',
        },
      },
      backlogID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Backlogs',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('AlbumBacklogs');
  },
};
