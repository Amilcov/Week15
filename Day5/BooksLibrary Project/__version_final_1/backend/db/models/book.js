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
      const mappingColumns = {
        through: "BookAuthor",
        foreignKey: 'bookId',
        otherKey: 'authorId',
      };
      Book.belongsToMany(models.Author, mappingColumns);


      Book.hasMany(models.BorrowBook, {
        as: 'borrowBook',
        foreignKey: 'bookId'
      });

    }
  }
  Book.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subtitle: {
      type: DataTypes.STRING,
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