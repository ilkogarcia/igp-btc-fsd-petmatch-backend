'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      accountTypeId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'AccountTypes',
          key: 'id',
          as: 'accountTypeId'
        }
      },
      cityId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Cities',
          key: 'id',
          as: 'cityId'
        }
      },
      stateProvinceId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'StateProvinces',
          key: 'id',
          as: 'stateProvinceId'
        }
      },
      countryId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Countries',
          key: 'id',
          as: 'countryId'
        }
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      passwordHash: {
        allowNull: false,
        type: Sequelize.STRING
      },
      profilePicture: {
        type: Sequelize.STRING
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      addressLine1: {
        type: Sequelize.STRING
      },
      addressLine2: {
        type: Sequelize.STRING
      },
      postalCode: {
        type: Sequelize.STRING
      },
      phoneNumber: {
        type: Sequelize.STRING
      },
      birthday: {
        type: Sequelize.DATE
      },
      gender: {
        type: Sequelize.STRING
      },
      isActive: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      isVerified: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      lastLogin: {
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('Users')
  }
}
