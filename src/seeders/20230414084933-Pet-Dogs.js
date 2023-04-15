'use strict'
/** @type {import('sequelize-cli').Migration} */
const { faker } = require('@faker-js/faker')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const specieId = await queryInterface.rawSelect('PetSpecies', {
      where: { specieCommonName: 'Dog' }
    }, ['id'])

    if (specieId) {
      const pets = []
      for (let i = 0; i < 50; i++) {
        const breedId = await queryInterface.rawSelect('PetBreeds', {
          where: { specieId },
          order: queryInterface.sequelize.random()
        }, ['id'])

        const shelterId = await queryInterface.rawSelect('Shelters', {
          order: queryInterface.sequelize.random()
        }, ['id'])

        const statusId = await queryInterface.rawSelect('PetStatuses', {
          order: queryInterface.sequelize.random()
        }, ['id'])

        const pet = {
          specieId,
          breedId,
          shelterId,
          statusId,
          gender: faker.helpers.arrayElement(['Male', 'Female']),
          name: faker.name.firstName(),
          age: faker.datatype.number({ min: 1, max: 20, precision: 1 }),
          description: faker.lorem.sentence(),
          imageUrl: faker.image.imageUrl(400, 400, 'animals', true, true),
          vaccinationStatus: faker.helpers.arrayElement(['Vaccinated', 'Not Vaccinated', 'Unknown']),
          spayedNeutered: faker.datatype.boolean(),
          createdAt: new Date(),
          updatedAt: new Date()
        }
        pets.push(pet)
      }

      return queryInterface.bulkInsert('Pets', pets, {})
    } else {
      console.log('Could not find specie ID')
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Pets', null, {})
  }
}
