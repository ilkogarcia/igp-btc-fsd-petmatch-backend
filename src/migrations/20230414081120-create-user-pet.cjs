'use strict'
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('UserPet', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'User',
          key: 'id',
          as: 'userId'
        }
      },
      petId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Pet',
          key: 'id',
          as: 'petId'
        }
      },
      myFavorite: {
        type: Sequelize.BOOLEAN
      },
      isSaved: {
        type: Sequelize.BOOLEAN
      },
      hasLike: {
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
    await queryInterface.dropTable('UserPet')
  }
}
