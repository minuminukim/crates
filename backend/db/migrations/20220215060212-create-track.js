'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tracks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      spotifyID: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
      },
      albumID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Albums',
        },
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      durationMS: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
    await queryInterface.dropTable('Tracks');
  },
};
