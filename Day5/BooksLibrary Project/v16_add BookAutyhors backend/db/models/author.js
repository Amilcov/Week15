'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Author extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Author.hasMany(models.BookAuthor, {
        as: 'bookAuthor',
        foreignKey: 'authorId'
      })
    }
  }
  Author.init({
    firstName: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        len: [1, 150]
      },
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        len: [1, 150]
      },
    },
    CNP: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    about: {
      allowNull: true,
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Author',
  });
  return Author;
};