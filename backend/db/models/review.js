'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      Review.belongsTo(models.User, { foreignKey: 'userID' });
      Review.belongsTo(models.Album, { foreignKey: 'albumID' });
    }

    static async getSingleReviewByID(id) {
      return await Review.findByPk(id);
    }

    static async getReviews() {
      return await Review.findAll();
    }

    static async getAlbumReviews(albumID) {
      return await Review.findAll({ where: albumID });
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
        validate: { max: 4000 },
      },
      listenedDate: {
        type: DataTypes.DATEONLY,
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
      isRelisten: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Review',
    }
  );
  return Review;
};
