
'use strict'
/** @type {import('sequelize-cli').Migration} */
const { faker } = require('@faker-js/faker')
const { Op } = require('sequelize')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const accountTypeId = await queryInterface.rawSelect('AccountType', {
      where: { title: 'user' }
    }, ['id'])

    const countryId = await queryInterface.rawSelect('Country', {
      where: { alpha3CountryCode: 'ESP' }
    }, ['id'])

    const users = []
    for (let i = 0; i < 20; i++) {
      const stateProvinceId = await queryInterface.rawSelect('StateProvince', {
        where: {
          [Op.or]: [
            { stateProvinceName: 'Alicante' },
            { stateProvinceName: 'Castellón' }
          ]
        },
        order: queryInterface.sequelize.random()
      }, ['id'])

      const cityId = await queryInterface.rawSelect('City', {
        where: { stateProvinceId },
        order: queryInterface.sequelize.random()
      }, ['id'])

      const user = {
        accountTypeId,
        cityId,
        stateProvinceId,
        countryId,
        username: faker.internet.userName(),
        email: faker.internet.email(),
        passwordHash: '$2y$15$dReJu12FKDp1oI.HcEOXu.BMA1pgr6sdn0Px4SNHvM5T6B78PZram',
        profilePicture: faker.image.sports(640, 480, true),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        addressLine1: faker.address.streetAddress(),
        addressLine2: faker.address.secondaryAddress(),
        postalCode: faker.address.zipCode('#####'),
        phoneNumber: faker.phone.number('+34 ### ### ###'),
        birthday: faker.date.birthdate(),
        gender: faker.name.gender(),
        isActive: faker.datatype.boolean(),
        isVerified: faker.datatype.boolean(),
        lastLogin: faker.date.recent(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
      users.push(user)
    }
    return queryInterface.bulkInsert('User', users, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('User', null, {})
  }
}
