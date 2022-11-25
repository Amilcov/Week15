'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BorrowBook extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      BorrowBook.belongsTo(models.Book, {
        as: 'book',
        foreignKey: 'bookId'
      });

    
        const mappingColumns = {
        through: "BookAuthor",
        foreignKey: 'bookId',
        otherKey: 'authorId',
      };

      BorrowBook.belongsToMany(models.Author, mappingColumns);
     

      // BorrowBook.belongsTo(models.Author, {
      //   as: 'author',
      //   foreignKey: 'authorId'
      // });

     
      BorrowBook.belongsTo(models.User, {
        as: 'reader',
        foreignKey: 'readerId'
      });
    
      
    
      BorrowBook.belongsTo(models.User, {
        as: 'user',
        foreignKey: 'userId'
      });
      

    }
  }
  BorrowBook.init({
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    bookId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    readerId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    startDate: {
      allowNull: false,
      type: DataTypes.DATEONLY
    },
    endDate: {
      allowNull: false,
      type: DataTypes.DATEONLY
    },
    returnDate: {
      type: DataTypes.DATEONLY
    }
  }, {
    sequelize,
    modelName: 'BorrowBook',
  });
  return BorrowBook;
};