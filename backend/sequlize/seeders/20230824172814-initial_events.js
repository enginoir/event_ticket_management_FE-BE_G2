"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(`Events`, [
      {
        id: 1,
        name: "Seminar Pemrograman Web",
        location: 3171,
        venue: "Jakarta Convention Center",
        category: 2,
        date_start: "2023-09-08",
        date_end: "2023-09-08",
        time_start: "",
        time_end: "",
        description: "Seminar tentang pemrograman web modern.",
        ticket_price: 500000,
        ticket_stock: 100,
        event_userid: 1,
        createdAt: "2023-07-31 17:00:00",
        updatedAt: Sequelize.fn("NOW"),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
