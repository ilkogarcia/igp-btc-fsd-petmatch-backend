
'use strict'
/** @type {import('sequelize-cli').Migration} */
const { faker } = require('@faker-js/faker')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const accountTypeId = await queryInterface.rawSelect('AccountTypes', {
      where: { title: 'user' }
    }, ['id'])

    const listUserPets = []
    for (let i = 0; i < 10; i++) {
      const userId = await queryInterface.rawSelect('Users', {
        where: { accountTypeId },
        order: queryInterface.sequelize.random()
      }, ['id'])

      const randomNumber = Math.floor(Math.random() * 10) + 1
      for (let i = 0; i < randomNumber; i++) {
        const petId = await queryInterface.rawSelect('Pets', {
          order: queryInterface.sequelize.random()
        }, ['id'])

        const userPet = {
          userId,
          petId,
          myFavorite: faker.datatype.boolean(),
          isSaved: faker.datatype.boolean(),
          hasLike: faker.datatype.boolean(),
          createdAt: new Date(),
          updatedAt: new Date()
        }
        listUserPets.push(userPet)
      }
    }
    return queryInterface.bulkInsert('UserPets', listUserPets, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('UserPets', null, {})
  }
}
