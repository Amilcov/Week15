'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
     await queryInterface.bulkInsert('Authors', [
      {
       firstName: 'Ion',
       lastName: 'Creanga',
       CNP: 'IC1837',
       about: '1 March 1837 – 31 December 1889, the most comic romanian writer novels'
     }, 
     {
        firstName: 'Jules',
        lastName: 'Verne',
        CNP: 'JS1828',
        about: '8 February 1828 – 24 March 1905, french novelist, poet, playwright, genere SF'
     },
     {
        firstName: 'Aghata',
        lastName: 'Christie',
        CNP: 'AG1890',
        about: '15 September 1890 - 12 January 1976, english writer, genere detective novels'
     },
      {
        firstName: 'Mihai',
        lastName: 'Eminescu',
        CNP: 'ME1850',
        about: '15 January 1850 – 15 June 1889 , the greatest romanian poet novelist, and journalist'
     },
      {
        firstName: 'Robert',
        lastName: 'Martin',
        CNP: 'RM1952',
        about: '5 December 1952-, american SWE, known forAgile Manifesto, design principels'
     },


     {
        firstName: 'Brain',
        lastName: 'Christian',
        CNP: 'BC1984',
        about: '28 July 1984-, american SWE, author'
     },

      {
        firstName: 'Tom',
        lastName: 'Griffiths',
        CNP: 'TG1978',
        about: '- 1978-, australian cognitive scientist'
     },


    ], {});
   
  },

 down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Authors', {
      CNP: { [Op.in]: ['IC1837', 'JS1828', 'AG1890', 'ME1850', 'RM1952', 'BC1984', 'TG1978'] }
    }, {});
  }
};
