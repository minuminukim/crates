'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Album extends Model {
    updateAverageRating(value, count) {
      const newAverage = (this.averageRating + value) / count;
      const rounded = Math.round(newAverage * 10) / 10;
      const fixed = parseFloat(rounded.toFixed(1));
      this.setDataValue('averageRating', fixed);

      return fixed;
    }

    static associate(models) {
      Album.belongsTo(models.Artist, { foreignKey: 'artistID' });
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
    }
  }
  Album.init(
    {
      spotifyID: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: { len: [1, 255] },
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: { len: [1, 255] },
      },
      averageRating: {
        type: DataTypes.DECIMAL(2, 1),
        allowNull: false,
        validate: {
          min: 0.0,
          max: 5.0,
        },
      },
      artistID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      artworkURL: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      releaseYear: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      genres: DataTypes.ARRAY(DataTypes.TEXT),
    },
    {
      sequelize,
      modelName: 'Album',
    }
  );
  return Album;
};
