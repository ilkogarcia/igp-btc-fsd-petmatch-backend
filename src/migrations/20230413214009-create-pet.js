'use strict'
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Pets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      specieId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'PetSpecies',
          key: 'id',
          as: 'specieId'
        }
      },
      breedId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'PetBreeds',
          key: 'id',
          as: 'breedId'
        }
      },
      shelterId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Shelters',
          key: 'id',
          as: 'shelterId'
        }
      },
      statusId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'PetStatuses',
          key: 'id',
          as: 'statusId'
        }
      },
      gender: {
        type: Sequelize.STRING
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      age: {
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING
      },
      imageUrl: {
        type: Sequelize.STRING
      },
      vaccinationStatus: {
        type: Sequelize.STRING
      },
      spayedNeutered: {
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
    await queryInterface.dropTable('Pets')
  }
}
