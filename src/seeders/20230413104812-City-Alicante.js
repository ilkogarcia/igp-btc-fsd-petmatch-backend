'use strict'
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const stateProvinceId = await queryInterface.rawSelect('StateProvinces', {
      where: { stateProvinceName: 'Alicante' }
    }, ['id'])

    const cities = [
      { stateProvinceId, cityName: 'Alicante', createdAt: new Date(), updatedAt: new Date() },
      { stateProvinceId, cityName: 'Elche', createdAt: new Date(), updatedAt: new Date() },
      { stateProvinceId, cityName: 'Torrevieja', createdAt: new Date(), updatedAt: new Date() },
      { stateProvinceId, cityName: 'Orihuela', createdAt: new Date(), updatedAt: new Date() },
      { stateProvinceId, cityName: 'Benidorm', createdAt: new Date(), updatedAt: new Date() },
      { stateProvinceId, cityName: 'Denia', createdAt: new Date(), updatedAt: new Date() },
      { stateProvinceId, cityName: 'Alcoy', createdAt: new Date(), updatedAt: new Date() },
      { stateProvinceId, cityName: 'San Vicente del Raspeig', createdAt: new Date(), updatedAt: new Date() },
      { stateProvinceId, cityName: 'Elda', createdAt: new Date(), updatedAt: new Date() },
      { stateProvinceId, cityName: 'Petrer', createdAt: new Date(), updatedAt: new Date() },
      { stateProvinceId, cityName: 'Villena', createdAt: new Date(), updatedAt: new Date() },
      { stateProvinceId, cityName: 'Santa Pola', createdAt: new Date(), updatedAt: new Date() },
      { stateProvinceId, cityName: 'Altea', createdAt: new Date(), updatedAt: new Date() },
      { stateProvinceId, cityName: 'Campello', createdAt: new Date(), updatedAt: new Date() },
      { stateProvinceId, cityName: 'Calpe', createdAt: new Date(), updatedAt: new Date() },
      { stateProvinceId, cityName: 'Novelda', createdAt: new Date(), updatedAt: new Date() },
      { stateProvinceId, cityName: 'Ibi', createdAt: new Date(), updatedAt: new Date() },
      { stateProvinceId, cityName: 'Javea', createdAt: new Date(), updatedAt: new Date() },
      { stateProvinceId, cityName: 'Crevillente', createdAt: new Date(), updatedAt: new Date() },
      { stateProvinceId, cityName: 'Sax', createdAt: new Date(), updatedAt: new Date() },
      { stateProvinceId, cityName: 'Villajoyosa', createdAt: new Date(), updatedAt: new Date() },
      { stateProvinceId, cityName: 'Aspe', createdAt: new Date(), updatedAt: new Date() },
      { stateProvinceId, cityName: 'Rojales', createdAt: new Date(), updatedAt: new Date() },
      { stateProvinceId, cityName: 'Alfaz del Pi', createdAt: new Date(), updatedAt: new Date() },
      { stateProvinceId, cityName: 'Pilar de la Horadada', createdAt: new Date(), updatedAt: new Date() },
      { stateProvinceId, cityName: 'Teulada', createdAt: new Date(), updatedAt: new Date() }
      // Add more cities as needed
    ]

    return queryInterface.bulkInsert('Cities', cities, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Cities', null, {})
  }
}
