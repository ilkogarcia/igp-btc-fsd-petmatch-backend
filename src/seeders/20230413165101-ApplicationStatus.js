'use strict'
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const statuses = [
      {
        statusName: 'Pending application',
        statusDescription: 'The user has submitted an adoption application, but it has not been reviewed or approved yet.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        statusName: 'Under review',
        statusDescription: 'The adoption application is being reviewed by the organization responsible for the pet.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        statusName: 'Approved',
        statusDescription: 'The user has been approved to adopt the pet, but the adoption process is not yet complete.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        statusName: 'Pending agreement',
        statusDescription: 'The user and the organization responsible for the pet are working on finalizing the adoption agreement.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        statusName: 'Pending payment',
        statusDescription: 'The user has agreed to adopt the pet, but payment has not been received yet.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        statusName: 'In transit',
        statusDescription: 'The pet is being transported from the organization to the user home.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        statusName: 'Completed',
        statusDescription: 'The adoption process has been completed successfully and the pet has been adopted.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        statusName: 'Rejected',
        statusDescription: 'The users adoption application has been rejected by the organization for some reason.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        statusName: 'Cancelled',
        statusDescription: 'The user has cancelled the adoption process for some reason.',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]

    return queryInterface.bulkInsert('ApplicationStatuses', statuses, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('ApplicationStatuses', null, {})
  }
}
