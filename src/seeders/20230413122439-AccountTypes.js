'use strict'
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const accounts = [
      {
        title: 'user',
        description: 'Users of the platform who are interested in adopting a pet',
        permissions: 'Pets:Search,List,View',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'shelter',
        description: 'Organizations that publish lists of pets available for adoption on the platform',
        permissions: 'Pets:Search,List,View,Create,Edit,Delete',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'administrator',
        description: 'People responsible for managing and maintaining the platform',
        permissions: 'Pet:All/Shelter:All/User:All/AdoptionApplication:All',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'developer',
        description: 'People responsible for creating and maintaining the software and technical infrastructure of the platform',
        permissions: 'Pet:All/Shelter:All/User:All/AdoptionApplication:All',
        isActive: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]

    return queryInterface.bulkInsert('AccountTypes', accounts, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('AccountTypes', null, {})
  }
}
