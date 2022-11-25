'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
     await queryInterface.bulkInsert('Books', [
      {
       title: 'Capra cu trei iezi',
       maxBorrowDays: 14
      },

      {
        title: '20,000 Leagues Under the Sea',
        maxBorrowDays: 20
      },

      {
        title: 'Clean Code',
        maxBorrowDays: 20
      },

      {
        title: 'Algorithms to live by',
        subtitle: 'The computer science of human decisions',
        maxBorrowDays: 30
      },

      

    ], {});

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
