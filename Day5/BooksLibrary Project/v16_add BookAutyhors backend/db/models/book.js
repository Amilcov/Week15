'use strict';
const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Book.hasMany(models.BookAuthor, {
        as: 'bookAuthor',
        foreignKey: 'bookId'
      })
    }
  }
  Book.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subtitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    maxBorrowDays: {
      type: DataTypes.SMALLINT,
      allowNull: false,
   },
    cover: {
      type: DataTypes.BLOB
    }
  }, {
    sequelize,
    modelName: 'Book',
  });


  return Book;
};