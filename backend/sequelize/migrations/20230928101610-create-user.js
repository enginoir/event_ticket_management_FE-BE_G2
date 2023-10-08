'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING
      },
      referralcode: {
        type: Sequelize.STRING
      },
      is_admin: {
        type: Sequelize.BOOLEAN
      },
      birthdate: {
        type: Sequelize.DATEONLY
      },
      is_verified: {
        type: Sequelize.BOOLEAN
      },
      reset_password_token: {
        type: Sequelize.STRING
      },
      verify_token: {
        type: Sequelize.STRING
      },
      points: {
        type: Sequelize.INTEGER
      },
      failed_attempts: {
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
    await queryInterface.dropTable('Users');
  }
};