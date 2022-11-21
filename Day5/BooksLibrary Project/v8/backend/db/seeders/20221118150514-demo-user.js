'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'Adriana',
        lastName: 'Worker',
        type: 'W', 
        email: 'adriana@y.com',
        username: 'adriana',
        hashedPassword: bcrypt.hashSync('adriana'),
      },
      { firstName: 'Claudia',
        lastName: 'Reader',
        type: 'R', 
        email: 'claudia@y.com',
        username: 'claudia',
        hashedPassword: bcrypt.hashSync('claudia'),
      },
      { firstName: 'Elvis',
        lastName: 'Preasly',
        type: 'W', 
        email: 'elvis@y.com',
        username: 'elvis',
        hashedPassword: bcrypt.hashSync('elvis'),
      },
      { firstName: 'Maria',
        lastName: 'Tanase',
        type: 'R', 
        email: 'maria@y.com',
        username: 'maria',
        hashedPassword: bcrypt.hashSync('maria'),
      },

      { firstName: 'Aurel',
        lastName: 'Vlaicu',
        type: 'R', 
        email: 'aurel@y.com',
        username: 'aurel',
        hashedPassword: bcrypt.hashSync('aurel'),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['adriana', 'claudia', 'elvis', 'maria', 'aurel'] }
    }, {});
  }
};