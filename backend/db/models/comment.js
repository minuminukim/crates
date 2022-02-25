'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      Comment.belongsTo(models.User, { foreignKey: 'userID', as: 'user' });
      Comment.belongsTo(models.Review, {
        foreignKey: 'reviewID',
        as: 'review',
      });
    }
  }
  Comment.init(
    {
      userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      reviewID: { type: DataTypes.INTEGER, allowNull: false },
      body: {
        type: DataTypes.STRING(500),
        allowNull: false,
        validate: { len: [1, 500] },
      },
    },
    {
      sequelize,
      modelName: 'Comment',
    }
  );
  return Comment;
};
