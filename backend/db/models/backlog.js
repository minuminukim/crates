'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Backlog extends Model {
    static associate(models) {
      Backlog.belongsTo(models.User, { foreignKey: 'userID' });
    }
  }
  Backlog.init(
    {
      userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: 'Backlog',
    }
  );
  return Backlog;
};
