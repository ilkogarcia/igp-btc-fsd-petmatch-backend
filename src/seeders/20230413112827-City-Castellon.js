'use strict'
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const stateProvinceId = await queryInterface.rawSelect('StateProvinces', {
      where: { stateProvinceName: 'Castellón' }
    }, ['id'])

    const cities = [
      { stateProvinceId, cityName: 'Alcalà de Xivert', createdAt: new Date(), updatedAt: new Date() },
      { stateProvinceId, cityName: 'Alcudia de Veo', createdAt: new Date(), updatedAt: new Date() },
      { stateProvinceId, cityName: 'Almassora', createdAt: new Date(), updatedAt: new Date() },
      { stateProvinceId, cityName: 'Benicarló', createdAt: new Date(), updatedAt: new Date() },
      { stateProvinceId, cityName: 'Benicasim', createdAt: new Date(), updatedAt: new Date() },
      { stateProvinceId, cityName: 'Borriana', createdAt: new Date(), updatedAt: new Date() },
      { stateProvinceId, cityName: 'Burriana', createdAt: new Date(), updatedAt: new Date() },
      { stateProvinceId, cityName: 'Castelló de la Plana', createdAt: new Date(), updatedAt: new Date() },
      { stateProvinceId, cityName: 'Cervera del Maestre', createdAt: new Date(), updatedAt: new Date() },
      { stateProvinceId, cityName: 'La Jana', createdAt: new Date(), updatedAt: new Date() },
      { stateProvinceId, cityName: 'Les Coves de Vinromà', createdAt: new Date(), updatedAt: new Date() },
      { stateProvinceId, cityName: 'Moncofa', createdAt: new Date(), updatedAt: new Date() },
      { stateProvinceId, cityName: 'Montán', createdAt: new Date(), updatedAt: new Date() },
      { stateProvinceId, cityName: 'Morella', createdAt: new Date(), updatedAt: new Date() },
      { stateProvinceId, cityName: 'Oropesa del Mar', createdAt: new Date(), updatedAt: new Date() },
      { stateProvinceId, cityName: 'Peñíscola', createdAt: new Date(), updatedAt: new Date() },
      { stateProvinceId, cityName: 'San Jorge', createdAt: new Date(), updatedAt: new Date() },
      { stateProvinceId, cityName: 'San Mateu', createdAt: new Date(), updatedAt: new Date() },
      { stateProvinceId, cityName: 'Torreblanca', createdAt: new Date(), updatedAt: new Date() },
      { stateProvinceId, cityName: 'Vinaròs', createdAt: new Date(), updatedAt: new Date() }
      // Add more cities as needed
    ]

    return queryInterface.bulkInsert('Cities', cities, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Cities', null, {})
  }
}
