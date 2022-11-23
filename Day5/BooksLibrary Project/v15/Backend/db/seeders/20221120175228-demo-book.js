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
        title: '1000 de leghe sub mari',
        maxBorrowDays: 20
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
