'use strict'
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('PetBreed', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      specieId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'PetSpecie',
          key: 'id',
          as: 'specieId'
        }
      },
      breedName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      averageHeight: {
        allowNull: false,
        type: Sequelize.STRING
      },
      averageWeight: {
        allowNull: false,
        type: Sequelize.STRING
      },
      averageLifeExpectancy: {
        allowNull: false,
        type: Sequelize.STRING
      },
      breedDescription: {
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
    await queryInterface.dropTable('PetBreed')
  }
}
