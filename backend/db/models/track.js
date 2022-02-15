'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Track extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Track.belongsTo(models.Album, { foreignKey: 'albumID' });
    }
  }
  Track.init(
    {
      spotifyID: {
        type: DataTypes.STRING(255),
        allowNull: false,
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
