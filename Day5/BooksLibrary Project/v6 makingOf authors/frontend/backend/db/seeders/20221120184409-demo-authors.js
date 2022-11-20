'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
     await queryInterface.bulkInsert('Authors', [
      {
       firstName: 'Ion',
       lastName: 'Creanga',
       CNP: 'IC1837'
     }, 
     {
        firstName: 'Jules',
        lastName: 'Verne',
        CNP: 'JS1828'
     },
     {
        firstName: 'Aghata',
        lastName: 'Christie',
        CNP: 'AG1890'
     },
      {
        firstName: 'Mihai',
        lastName: 'Eminescu',
        CNP: 'ME1850'
     },
      {
        firstName: 'Robert',
        lastName: 'Martin',
        CNP: 'RM1952'
     },

    ], {});
   
  },

 down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Authors', {
      CNP: { [Op.in]: ['IC1837', 'JS1828', 'AG1890', 'ME1850', 'RM1952'] }
    }, {});
  }
};
