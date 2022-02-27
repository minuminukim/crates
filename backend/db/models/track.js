'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Track extends Model {
    static associate(models) {
      Track.belongsTo(models.Album, { foreignKey: 'albumID' });
    }
  }
  Track.init(
    {
      spotifyID: {
        type: DataTypes.STRING(255),
        allowNull: true,
        validate: { len: [1, 255] },
      },
      albumID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      durationMS: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Track',
    }
  );
  return Track;
};
