'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Album extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Album.belongsTo(models.Artist, { foreignKey: 'artistID' });
      Album.hasMany(models.Track, { foreignKey: 'albumID' });
      Album.belongsToMany(models.User, {
        through: 'UserAlbum',
        otherKey: 'userID',
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
