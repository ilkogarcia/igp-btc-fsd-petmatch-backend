
'use strict'
/** @type {import('sequelize-cli').Migration} */
const { faker } = require('@faker-js/faker')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const accountTypeId = await queryInterface.rawSelect('AccountType', {
      where: { title: 'user' }
    }, ['id'])

    const petStatusId = await queryInterface.rawSelect('PetStatus', {
      where: { statusName: 'Available for adoption' }
    }, ['id'])

    const addoptionApplications = []
    for (let i = 0; i < 10; i++) {
      const userId = await queryInterface.rawSelect('User', {
        where: { accountTypeId },
        order: queryInterface.sequelize.random()
      }, ['id'])

      const petRecord = await queryInterface.sequelize.query(
        'SELECT id, shelterId FROM Pet WHERE statusId = :statusId ORDER BY RAND() LIMIT 1',
        {
          replacements: { statusId: petStatusId },
          type: queryInterface.sequelize.QueryTypes.SELECT,
          raw: true
        }
      )
      const { id, shelterId } = petRecord[0]

      const statusId = await queryInterface.rawSelect('ApplicationStatus', {
        order: queryInterface.sequelize.random()
      }, ['id'])

      const addoptionApplication = {
        userId,
        petId: id,
        shelterId,
        statusId,
        applicationDate: faker.date.soon(),
        applicationNotes: faker.lorem.paragraphs(3),
        createdAt: new Date(),
        updatedAt: new Date()
      }
      addoptionApplications.push(addoptionApplication)
    }
    return queryInterface.bulkInsert('AdoptionApplication', addoptionApplications, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('AdoptionApplication', null, {})
  }
}
