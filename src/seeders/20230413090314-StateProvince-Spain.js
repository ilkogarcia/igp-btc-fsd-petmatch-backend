'use strict'
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const countryId = await queryInterface.rawSelect('Countries', {
      where: { alpha3CountryCode: 'ESP' }
    }, ['id'])

    const provinces = [
      { countryId, stateProvinceName: 'Álava', createdAt: new Date(), updatedAt: new Date() },
      { countryId, stateProvinceName: 'Albacete', createdAt: new Date(), updatedAt: new Date() },
      { countryId, stateProvinceName: 'Alicante', createdAt: new Date(), updatedAt: new Date() },
      { countryId, stateProvinceName: 'Almería', createdAt: new Date(), updatedAt: new Date() },
      { countryId, stateProvinceName: 'Asturias', createdAt: new Date(), updatedAt: new Date() },
      { countryId, stateProvinceName: 'Ávila', createdAt: new Date(), updatedAt: new Date() },
      { countryId, stateProvinceName: 'Badajoz', createdAt: new Date(), updatedAt: new Date() },
      { countryId, stateProvinceName: 'Barcelona', createdAt: new Date(), updatedAt: new Date() },
      { countryId, stateProvinceName: 'Burgos', createdAt: new Date(), updatedAt: new Date() },
      { countryId, stateProvinceName: 'Cáceres', createdAt: new Date(), updatedAt: new Date() },
      { countryId, stateProvinceName: 'Cádiz', createdAt: new Date(), updatedAt: new Date() },
      { countryId, stateProvinceName: 'Cantabria', createdAt: new Date(), updatedAt: new Date() },
      { countryId, stateProvinceName: 'Castellón', createdAt: new Date(), updatedAt: new Date() },
      { countryId, stateProvinceName: 'Ciudad Real', createdAt: new Date(), updatedAt: new Date() },
      { countryId, stateProvinceName: 'Córdoba', createdAt: new Date(), updatedAt: new Date() },
      { countryId, stateProvinceName: 'Cuenca', createdAt: new Date(), updatedAt: new Date() },
      { countryId, stateProvinceName: 'Gerona', createdAt: new Date(), updatedAt: new Date() },
      { countryId, stateProvinceName: 'Granada', createdAt: new Date(), updatedAt: new Date() },
      { countryId, stateProvinceName: 'Guadalajara', createdAt: new Date(), updatedAt: new Date() },
      { countryId, stateProvinceName: 'Guipúzcoa', createdAt: new Date(), updatedAt: new Date() },
      { countryId, stateProvinceName: 'Huelva', createdAt: new Date(), updatedAt: new Date() },
      { countryId, stateProvinceName: 'Huesca', createdAt: new Date(), updatedAt: new Date() },
      { countryId, stateProvinceName: 'Jaén', createdAt: new Date(), updatedAt: new Date() },
      { countryId, stateProvinceName: 'La Rioja', createdAt: new Date(), updatedAt: new Date() },
      { countryId, stateProvinceName: 'Las Palmas', createdAt: new Date(), updatedAt: new Date() },
      { countryId, stateProvinceName: 'León', createdAt: new Date(), updatedAt: new Date() },
      { countryId, stateProvinceName: 'Lérida', createdAt: new Date(), updatedAt: new Date() },
      { countryId, stateProvinceName: 'Lugo', createdAt: new Date(), updatedAt: new Date() },
      { countryId, stateProvinceName: 'Madrid', createdAt: new Date(), updatedAt: new Date() },
      { countryId, stateProvinceName: 'Málaga', createdAt: new Date(), updatedAt: new Date() },
      { countryId, stateProvinceName: 'Murcia', createdAt: new Date(), updatedAt: new Date() },
      { countryId, stateProvinceName: 'Navarra', createdAt: new Date(), updatedAt: new Date() },
      { countryId, stateProvinceName: 'Orense', createdAt: new Date(), updatedAt: new Date() },
      { countryId, stateProvinceName: 'Palencia', createdAt: new Date(), updatedAt: new Date() },
      { countryId, stateProvinceName: 'Pontevedra', createdAt: new Date(), updatedAt: new Date() },
      { countryId, stateProvinceName: 'Salamanca', createdAt: new Date(), updatedAt: new Date() },
      { countryId, stateProvinceName: 'Santa Cruz de Tenerife', createdAt: new Date(), updatedAt: new Date() },
      { countryId, stateProvinceName: 'Segovia', createdAt: new Date(), updatedAt: new Date() },
      { countryId, stateProvinceName: 'Sevilla', createdAt: new Date(), updatedAt: new Date() },
      { countryId, stateProvinceName: 'Soria', createdAt: new Date(), updatedAt: new Date() },
      { countryId, stateProvinceName: 'Tarragona', createdAt: new Date(), updatedAt: new Date() },
      { countryId, stateProvinceName: 'Teruel', createdAt: new Date(), updatedAt: new Date() },
      { countryId, stateProvinceName: 'Toledo', createdAt: new Date(), updatedAt: new Date() },
      { countryId, stateProvinceName: 'Valencia', createdAt: new Date(), updatedAt: new Date() },
      { countryId, stateProvinceName: 'Valladolid', createdAt: new Date(), updatedAt: new Date() },
      { countryId, stateProvinceName: 'Vizcaya', createdAt: new Date(), updatedAt: new Date() },
      { countryId, stateProvinceName: 'Zamora', createdAt: new Date(), updatedAt: new Date() },
      { countryId, stateProvinceName: 'Zaragoza', createdAt: new Date(), updatedAt: new Date() }
    ]

    return queryInterface.bulkInsert('StateProvinces', provinces, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('StateProvinces', null, {})
  }
}
