'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Album extends Model {
    static async getSingleAlbumByID(id) {
      return await Album.findByPk(id);
    }

    static async getAlbums() {
      return await Album.findAll();
    }

    static associate(models) {
      // Album.belongsTo(models.Artist, {
      //   foreignKey: 'artistID',
      //   allowNull: true,
      // });
      Album.hasMany(models.Track, { foreignKey: 'albumID' });
      Album.hasMany(models.Review, { foreignKey: 'albumID' });
      Album.belongsToMany(models.User, {
        through: 'UserAlbum',
        otherKey: 'userID',
        foreignKey: 'albumID',
      });
      Album.belongsToMany(models.List, {
        through: 'AlbumList',
        otherKey: 'listID',
        foreignKey: 'albumID',
      });
      Album.belongsToMany(models.Backlog, {
        through: 'AlbumBacklog',
        otherKey: 'backlogID',
        foreignKey: 'albumID',
      });
    }
  }
  Album.init(
    {
      spotifyID: {
        type: DataTypes.STRING(255),
        allowNull: true,
        validate: { len: [1, 255] },
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: { len: [1, 255] },
      },
      averageRating: {
        type: DataTypes.DECIMAL(3, 1),
        allowNull: false,
        validate: {
          min: 0.0,
          max: 10.0,
        },
      },
      ratingsCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      // artistID: {
      //   type: DataTypes.INTEGER,
      //   allowNull: true,
      // },
      artist: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          len: [1, 255],
        },
      },
      artworkURL: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      releaseYear: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      genres: { type: DataTypes.ARRAY(DataTypes.TEXT) },
    },
    {
      sequelize,
      modelName: 'Album',
    }
  );
  return Album;
};
