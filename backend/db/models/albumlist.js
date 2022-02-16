'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AlbumList extends Model {
    static associate(models) {
      AlbumList.belongsTo(models.Album, { foreignKey: 'AlbumID' });
      AlbumList.belongsTo(models.List, { foreignKey: 'listID' });
    }
  }
  AlbumList.init(
    {
      albumID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      listID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'AlbumList',
    }
  );
  return AlbumList;
};
