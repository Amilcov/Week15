'use strict';

const faker = require('faker');
const bcrypt = require('bcryptjs');


module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return queryInterface.bulkInsert('Users', [
    {
      username: "adriana",
      email: "adriana@y.com",
      hashedPassword: bcrypt.hashSync('adriana')
    },
    {
      username: "claudia",
      email: "claudia@y.com",
      hashedPassword: bcrypt.hashSync('claudia')
    },
    { 
      username: "robot1",
      email: faker.internet.email(),
      hashedPassword: bcrypt.hashSync(faker.internet.password())
    }
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   const Op = Sequelize.Op;
   return queryInterface.bulkDelete('Users', {
     userName: { [Op.in]: [['adriana', 'claudia', 'robo1']] }
   }, {});
  }
};
