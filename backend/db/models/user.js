'use strict';
const { Model, Validator, Sequelize } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    toSafeObject() {
      const { id, username, email } = this; // context will be the User instance
      // return { id, username, email, albums, reviews };
      return { id, username, email };
    }

    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    }

    static async getCurrentUserByID(id) {
      return await User.scope('currentUser').findByPk(id);
    }

    static async getSingleUserByID(id) {
      return await User.scope('defaultScope').findByPk(id);
    }

    static async login({ credential, password }) {
      const { Op } = require('sequelize');
      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential,
          },
        },
      });
      if (user && user.validatePassword(password)) {
        return await User.scope('currentUser').findByPk(user.id);
      }
    }

    static async signup({ username, email, password }) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        username,
        email,
        hashedPassword,
      });
      return await User.scope('currentUser').findByPk(user.id);
    }

    static associate(models) {
      User.hasMany(models.Review, { foreignKey: 'userID', as: 'reviews' });
      User.hasMany(models.List, { foreignKey: 'userID', as: 'lists' });
      User.hasOne(models.Backlog, { foreignKey: 'userID', as: 'backlog' });
      User.belongsToMany(models.Album, {
        through: 'UserAlbum',
        otherKey: 'albumID',
        foreignKey: 'userID',
        as: 'albums',
      });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error('Cannot be an email.');
            }
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 255],
        },
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60],
        },
      },
    },
    {
      sequelize,
      modelName: 'User',
      defaultScope: {
        attributes: {
          exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt'],
        },
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ['hashedPassword'] },
          include: ['albums', 'reviews'],
          // include: [{ model: sequelize.models.Album, as: 'albums' }],
        },
        loginUser: {
          attributes: {},
        },
      },
    }
  );
  return User;
};
