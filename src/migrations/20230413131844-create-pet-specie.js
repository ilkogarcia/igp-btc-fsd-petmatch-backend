'use strict'
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('PetSpecies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      specieCommonName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      specieScientificName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      specieDescription: {
        allowNull: false,
        type: Sequelize.STRING
      },
      isActive: {
        allowNull: false,
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('PetSpecies')
  }
}
