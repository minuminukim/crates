'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      Review.belongsTo(models.User, { foreignKey: 'userID' });
      Review.belongsTo(models.Album, { foreignKey: 'albumID' });
    }
  }
  Review.init(
    {
      userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      albumID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      body: {
        type: DataTypes.STRING(4000),
        allowNull: false,
        validate: { len: [1, 4000] },
      },
      listenedDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 10,
        },
      },
    },
    {
      sequelize,
      modelName: 'Review',
    }
  );
  return Review;
};
