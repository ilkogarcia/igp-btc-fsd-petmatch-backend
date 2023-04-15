'use strict'
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const stateProvinceId = await queryInterface.rawSelect('StateProvinces', {
      where: { stateProvinceName: 'Valencia' }
    }, ['id'])

    const cities = [
      { stateProvinceId, cityName: 'Valencia', createdAt: new Date(), updatedAt: new Date() },
      { stateProvinceId, cityName: 'Gandia', createdAt: new Date(), updatedAt: new Date() },
      { stateProvinceId, cityName: 'Torrent', createdAt: new Date(), updatedAt: new Date() },
      { stateProvinceId, cityName: 'Paterna', createdAt: new Date(), updatedAt: new Date() },
      { stateProvinceId, cityName: 'Sagunto', createdAt: new Date(), updatedAt: new Date() },
      { stateProvinceId, cityName: 'Alzira', createdAt: new Date(), updatedAt: new Date() },
      { stateProvinceId, cityName: 'Ontinyent', createdAt: new Date(), updatedAt: new Date() },
      { stateProvinceId, cityName: 'Xàtiva', createdAt: new Date(), updatedAt: new Date() },
      { stateProvinceId, cityName: 'Cullera', createdAt: new Date(), updatedAt: new Date() },
      { stateProvinceId, cityName: 'Llíria', createdAt: new Date(), updatedAt: new Date() },
      { stateProvinceId, cityName: 'Alaquàs', createdAt: new Date(), updatedAt: new Date() },
      { stateProvinceId, cityName: 'Carcaixent', createdAt: new Date(), updatedAt: new Date() },
      { stateProvinceId, cityName: 'Picassent', createdAt: new Date(), updatedAt: new Date() },
      { stateProvinceId, cityName: 'Requena', createdAt: new Date(), updatedAt: new Date() },
      { stateProvinceId, cityName: 'Mislata', createdAt: new Date(), updatedAt: new Date() },
      { stateProvinceId, cityName: 'Bétera', createdAt: new Date(), updatedAt: new Date() },
      { stateProvinceId, cityName: 'Aldaia', createdAt: new Date(), updatedAt: new Date() },
      { stateProvinceId, cityName: 'Catarroja', createdAt: new Date(), updatedAt: new Date() },
      { stateProvinceId, cityName: 'Chiva', createdAt: new Date(), updatedAt: new Date() },
      { stateProvinceId, cityName: 'Massamagrell', createdAt: new Date(), updatedAt: new Date() }
      // Add more cities as needed
    ]

    return queryInterface.bulkInsert('Cities', cities, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Cities', null, {})
  }
}
