'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.INTEGER
      },
      venue: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.INTEGER
      },
      date_start: {
        type: Sequelize.DATEONLY
      },
      date_end: {
        type: Sequelize.DATEONLY
      },
      time_start: {
        type: Sequelize.TIME
      },
      time_end: {
        type: Sequelize.TIME
      },
      description: {
        type: Sequelize.TEXT
      },
      ticket_price: {
        type: Sequelize.INTEGER
      },
      ticket_stock: {
        type: Sequelize.INTEGER
      },
      event_userid: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Events');
  }
};