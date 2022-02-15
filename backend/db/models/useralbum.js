'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserAlbum extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
