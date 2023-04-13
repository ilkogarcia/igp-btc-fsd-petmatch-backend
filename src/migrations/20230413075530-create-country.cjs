'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Country', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      alpha2CountryCode: {
        allowNull: false,
        type: Sequelize.STRING
      },
      alpha3CountryCode: {
        allowNull: false,
        type: Sequelize.STRING
      },
      numericCountryCode: {
        allowNull: false,
        type: Sequelize.STRING
      },
      countryName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Country')
  }
}
