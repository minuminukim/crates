'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Backlog extends Model {
    static async getBacklog(id) {
      return await Backlog.findOne({
        where: {
          id: id,
        },
        include: 'albums',
      });
    }

    static associate(models) {
      Backlog.belongsTo(models.User, { foreignKey: 'userID' });
      Backlog.belongsToMany(models.Album, {
        through: 'AlbumBacklog',
        otherKey: 'albumID',
        foreignKey: 'backlogID',
        as: 'albums',
      });
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
