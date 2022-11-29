'use strict';
const bcrypt = require('bcryptjs');
const { Validator } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 150]
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 150]
      },
    },
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
        len: [3, 256]
      },
    },
    
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      },
    },

    contact: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING,
      validate: {
        len: [1, 1]
      },
    },
  }, {});

  User.associate = function(models) {
    // associations can be defined here

    User.hasMany(models.BorrowBook, {
        as: 'borrowBookUser',
        foreignKey: 'userId'
    });

    User.hasMany(models.BorrowBook, {
      as: 'borrowBookReader',
      foreignKey: 'readerId'
    });
       

  };

  User.prototype.toSafeObject = function() { 
    const { id, firstName, lastName, type ,username, email } = this; 
    return { id, firstName, lastName , type, username, email };
  };

  User.prototype.validatePassword = function (password) {
     return bcrypt.compareSync(password, this.hashedPassword.toString());
  };

  User.getUserById = async function (id) {
     return await User.findByPk(id);
  };

  User.login = async function ({ credential, password }) {
    const { Op } = require('sequelize');
    const user = await User.findOne({
      where: {
       [Op.or]: {
          username: credential,
          email: credential,
        },
      },
    });
    if (user && user.validatePassword(password)) {
       return await User.findByPk(user.id);
    }
  };

  User.signup = async function ({ firstName, lastName, type, username, email, password }) {
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      firstName, 
      lastName, 
      type,
      username,
      email,
      hashedPassword,
    });
    return await User.findByPk(user.id);
  };  

  return User;
};
