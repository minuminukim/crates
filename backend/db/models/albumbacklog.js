'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AlbumBacklog extends Model {
    static associate(models) {
      AlbumBacklog.belongsTo(models.Album, { foreignKey: 'albumID' });
      AlbumBacklog.belongsTo(models.Backlog, { foreignKey: 'backlogID' });
    }
  }
  AlbumBacklog.init(
    {
      albumID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      backlogID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'AlbumBacklog',
    }
  );
  return AlbumBacklog;
};
