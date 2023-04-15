'use strict'
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const statuses = [
      {
        statusName: 'Already adopted',
        statusDescription: 'The pet has already been adopted by a new owner and is no longer available for adoption.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        statusName: 'Available for adoption',
        statusDescription: 'The pet is currently available for adoption and looking for a new home.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        statusName: 'Fostered',
        statusDescription: 'The pet is being cared for by a foster family until a permanent home is found.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        statusName: 'On hold',
        statusDescription: 'A potential adopter has shown interest in the pet and is undergoing the adoption process.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        statusName: 'Medical hold',
        statusDescription: 'The pet is currently receiving medical treatment and is not yet available for adoption.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        statusName: 'Found',
        statusDescription: 'The pet has been found but has not yet been reunited with its owner or placed for adoption.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        statusName: 'Lost',
        statusDescription: 'The pet has gone missing and its location is unknown.',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]

    return queryInterface.bulkInsert('PetStatuses', statuses, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('PetStatuses', null, {})
  }
}
