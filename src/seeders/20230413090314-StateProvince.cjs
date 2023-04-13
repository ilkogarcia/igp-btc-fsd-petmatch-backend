'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('StateProvince', [
      { countryId: 9, stateProvinceName: 'Álava', createdAt: new Date(), updatedAt: new Date() },
      { countryId: 9, stateProvinceName: 'Albacete', createdAt: new Date(), updatedAt: new Date() },
      { countryId: 9, stateProvinceName: 'Alicante', createdAt: new Date(), updatedAt: new Date() },
      { countryId: 9, stateProvinceName: 'Almería', createdAt: new Date(), updatedAt: new Date() },
      { countryId: 9, stateProvinceName: 'Asturias', createdAt: new Date(), updatedAt: new Date() },
      { countryId: 9, stateProvinceName: 'Ávila', createdAt: new Date(), updatedAt: new Date() },
      { countryId: 9, stateProvinceName: 'Badajoz', createdAt: new Date(), updatedAt: new Date() },
      { countryId: 9, stateProvinceName: 'Barcelona', createdAt: new Date(), updatedAt: new Date() },
      { countryId: 9, stateProvinceName: 'Burgos', createdAt: new Date(), updatedAt: new Date() },
      { countryId: 9, stateProvinceName: 'Cáceres', createdAt: new Date(), updatedAt: new Date() },
      { countryId: 9, stateProvinceName: 'Cádiz', createdAt: new Date(), updatedAt: new Date() },
      { countryId: 9, stateProvinceName: 'Cantabria', createdAt: new Date(), updatedAt: new Date() },
      { countryId: 9, stateProvinceName: 'Castellón', createdAt: new Date(), updatedAt: new Date() },
      { countryId: 9, stateProvinceName: 'Ciudad Real', createdAt: new Date(), updatedAt: new Date() },
      { countryId: 9, stateProvinceName: 'Córdoba', createdAt: new Date(), updatedAt: new Date() },
      { countryId: 9, stateProvinceName: 'Cuenca', createdAt: new Date(), updatedAt: new Date() },
      { countryId: 9, stateProvinceName: 'Gerona', createdAt: new Date(), updatedAt: new Date() },
      { countryId: 9, stateProvinceName: 'Granada', createdAt: new Date(), updatedAt: new Date() },
      { countryId: 9, stateProvinceName: 'Guadalajara', createdAt: new Date(), updatedAt: new Date() },
      { countryId: 9, stateProvinceName: 'Guipúzcoa', createdAt: new Date(), updatedAt: new Date() },
      { countryId: 9, stateProvinceName: 'Huelva', createdAt: new Date(), updatedAt: new Date() },
      { countryId: 9, stateProvinceName: 'Huesca', createdAt: new Date(), updatedAt: new Date() },
      { countryId: 9, stateProvinceName: 'Jaén', createdAt: new Date(), updatedAt: new Date() },
      { countryId: 9, stateProvinceName: 'La Rioja', createdAt: new Date(), updatedAt: new Date() },
      { countryId: 9, stateProvinceName: 'Las Palmas', createdAt: new Date(), updatedAt: new Date() },
      { countryId: 9, stateProvinceName: 'León', createdAt: new Date(), updatedAt: new Date() },
      { countryId: 9, stateProvinceName: 'Lérida', createdAt: new Date(), updatedAt: new Date() },
      { countryId: 9, stateProvinceName: 'Lugo', createdAt: new Date(), updatedAt: new Date() },
      { countryId: 9, stateProvinceName: 'Madrid', createdAt: new Date(), updatedAt: new Date() },
      { countryId: 9, stateProvinceName: 'Málaga', createdAt: new Date(), updatedAt: new Date() },
      { countryId: 9, stateProvinceName: 'Murcia', createdAt: new Date(), updatedAt: new Date() },
      { countryId: 9, stateProvinceName: 'Navarra', createdAt: new Date(), updatedAt: new Date() },
      { countryId: 9, stateProvinceName: 'Orense', createdAt: new Date(), updatedAt: new Date() },
      { countryId: 9, stateProvinceName: 'Palencia', createdAt: new Date(), updatedAt: new Date() },
      { countryId: 9, stateProvinceName: 'Pontevedra', createdAt: new Date(), updatedAt: new Date() },
      { countryId: 9, stateProvinceName: 'Salamanca', createdAt: new Date(), updatedAt: new Date() },
      { countryId: 9, stateProvinceName: 'Santa Cruz de Tenerife', createdAt: new Date(), updatedAt: new Date() },
      { countryId: 9, stateProvinceName: 'Segovia', createdAt: new Date(), updatedAt: new Date() },
      { countryId: 9, stateProvinceName: 'Sevilla', createdAt: new Date(), updatedAt: new Date() }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('StateProvince', null, {})
  }
}
