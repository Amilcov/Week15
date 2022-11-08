'use strict';
const { Validator } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [4, 30],
        isnotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error('Can not be an email.')
          }
        },
      },
     
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 256],
      }
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    }
  }, {
    defaultScope: {
      attributes: {
        exclude: ['email','hashedPassword', 'createdAt', 'updatedAt']
      }
    }, 
    scopes: {
      currentUser: {
        attributes: {
          exclude: ['hashedPassword']
        }
      },
      loginUser: {
         attributes: {}
      }

    }
  });
  User.associate = function(models) {
    // associations can be defined here
  };

  User.prototype.toSafeObject = function() {
    const { id, username, email } = this;
    return {
      id, 
      username,
      email
    }
  };

  User.prototype.validatePassword = function(password)  {
    const { hashedPassword } = this;
    return bcrypt.compareSync(password, hashedPassword.toString());
  };

  User.getCurrentUserById = async function(id)  {
    return await User.scope('currentUser').finfByPk(id);
  };

  User.login = async function(payload) {
    const { credential, password } = payload;
    let user = await User.scope('loginUser').findOne({
     where:  {
             [Op.or]: { 
                email: credential,
                usename: credential
             }
      }
    })
     if (user &&  user.validatePassword(user.password)) { 
      return await User.scope('loginUser').findByPk(user.id)
     }     
  };

 User.signUp = async function(payload) {
  const { username, email, password } = payload;
  hashedPassword = bcrypt.hashSync(hashedPassword)
  const user = await User.create({username, email, hashedPassword});
  return await User.scope('currentUser').findByPk(user.id);
 }
  
  return User;
};