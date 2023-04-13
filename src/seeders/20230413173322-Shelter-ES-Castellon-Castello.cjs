'use strict'
/** @type {import('sequelize-cli').Migration} */
const { faker } = require('@faker-js/faker')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const shelters = []

    const countryId = await queryInterface.rawSelect('Country', {
      where: { alpha3CountryCode: 'ESP' }
    }, ['id'])

    const stateProvinceId = await queryInterface.rawSelect('StateProvince', {
      where: { stateProvinceName: 'Castellón' }
    }, ['id'])

    const cityId = await queryInterface.rawSelect('City', {
      where: { cityName: 'Castelló de la Plana' }
    }, ['id'])

    for (let i = 0; i < 10; i++) {
      const shelter = {
        cityId,
        stateProvinceId,
        countryId,
        addressLine1: faker.address.streetAddress(),
        addressLine2: faker.address.secondaryAddress(),
        postalCode: faker.address.zipCode(),
        name: faker.company.name(),
        description: faker.company.catchPhrase(),
        contactEmail: faker.internet.email(),
        contactPhone: faker.phone.number(),
        webUrl: faker.internet.url(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
      shelters.push(shelter)
    }

    return queryInterface.bulkInsert('Shelter', shelters, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Shelter', null, {})
  }
}
