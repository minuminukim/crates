'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
        },
      },
      albumID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: `Albums`,
        },
      },
      body: {
        type: Sequelize.STRING(4000),
        allowNull: false,
      },
      listenedDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      rating: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      isRelisten: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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
    await queryInterface.dropTable('Reviews');
  },
};
