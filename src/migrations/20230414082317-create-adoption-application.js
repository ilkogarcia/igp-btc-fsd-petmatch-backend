'use strict'
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('AdoptionApplications', {
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
          model: 'Users',
          key: 'id',
          as: 'userId'
        }
      },
      petId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Pets',
          key: 'id',
          as: 'petId'
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
          model: 'ApplicationStatuses',
          key: 'id',
          as: 'statusId'
        }
      },
      applicationDate: {
        type: Sequelize.DATE
      },
      approvalDate: {
        type: Sequelize.DATE
      },
      rejectionDate: {
        type: Sequelize.DATE
      },
      applicationNotes: {
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('AdoptionApplications')
  }
}
