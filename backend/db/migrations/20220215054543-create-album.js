'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Albums', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      spotifyID: {
        type: Sequelize.STRING(255),
        unique: true,
        allowNull: true,
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      averageRating: {
        type: Sequelize.DECIMAL(3, 1),
        allowNull: false,
        defaultValue: 0.0,
      },
      ratingsCount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      artist: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      artworkURL: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      releaseYear: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      genres: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
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
    await queryInterface.dropTable('Albums');
  },
};
