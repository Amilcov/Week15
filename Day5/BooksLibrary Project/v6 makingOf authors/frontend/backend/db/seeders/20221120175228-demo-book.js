'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
     await queryInterface.bulkInsert('Books', [
      {
       title: 'Capra cu trei iezi',
       max_borrow_days: 14
      },

      {
        title: '1000 de leghe sub mari',
        max_borrow_days: 20
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
