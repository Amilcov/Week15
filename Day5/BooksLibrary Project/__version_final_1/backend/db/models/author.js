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
       const mappingColumns = {
        through: "BookAuthor",
        foreignKey: 'authorId',
        otherKey: 'bookId',
      };

      Author.belongsToMany(models.Book, mappingColumns);
  
     
      const mappingColumns2 = {
        through: "BookAuthor",
        foreignKey: 'authorId',
        otherKey: 'bookId',
      };
    

      Author.belongsToMany(models.BorrowBook, mappingColumns);
    
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