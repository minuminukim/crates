'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AlbumLists', {
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
      listID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Lists',
        },
      },
      listIndex: {
        type: Sequelize.INTEGER,
        allowNull: true,
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
    await queryInterface.dropTable('AlbumLists');
  },
};
