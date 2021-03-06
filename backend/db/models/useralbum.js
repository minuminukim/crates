'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserAlbum extends Model {
    static associate(models) {
      UserAlbum.belongsTo(models.User, { foreignKey: 'userID' });
      UserAlbum.belongsTo(models.Album, { foreignKey: 'albumID' });
    }
  }
  UserAlbum.init(
    {
      userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      albumID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'UserAlbum',
    }
  );
  return UserAlbum;
};
