'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('BookAuthors', [
      {
        bookId: 1,
        authorId: 1
      },

      {
        bookId: 2,
        authorId: 2
      },

       {
        bookId: 3,
        authorId: 5
      },

      {
        bookId: 4,
        authorId: 6
      },

      {
        bookId: 4,
        authorId: 7
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
