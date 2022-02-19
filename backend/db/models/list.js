'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class List extends Model {
    static async getLists() {
      return await List.findAll({ include: 'albums' });
    }

    static async getSingleListByID(id) {
      return await List.findOne({
        where: {
          id: id,
        },
        include: 'albums',
      });
    }

    static associate(models) {
      List.belongsTo(models.User, { foreignKey: 'userID' });
      List.belongsToMany(models.Album, {
        through: 'AlbumList',
        otherKey: 'albumID',
        foreignKey: 'listID',
        as: 'albums',
      });
    }
  }
  List.init(
    {
      userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: { len: [1, 100] },
      },
      description: {
        type: DataTypes.STRING(4000),
      },
      isRanked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'List',
    }
  );
  return List;
};
