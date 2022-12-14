'use strict';
module.exports = (sequelize, DataTypes) => {
  const Photo = sequelize.define('Photo', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.BLOB('long')
    }
  }, {});
  Photo.associate = function(models) {
    // associations can be defined here
  };
  return Photo;
};