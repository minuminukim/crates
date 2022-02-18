'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      Review.belongsTo(models.User, { foreignKey: 'userID', as: 'user' });
      Review.belongsTo(models.Album, { foreignKey: 'albumID', as: 'album' });
    }

    static async getSingleReviewByID(id) {
      // return await Review.findByPk(id);
      return await Review.findOne({
        where: {
          id: id,
        },
        include: ['album', 'user'],
      });
    }

    static async getReviews() {
      return await Review.findAll({ include: ['album', 'user'] });
    }

    static async getAlbumReviews(albumID) {
      return await Review.findAll({
        where: { albumID: albumID },
        include: 'album',
      });
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
      // defaultScope: {
      //   include: 'album',
      // },
    }
  );
  return Review;
};
