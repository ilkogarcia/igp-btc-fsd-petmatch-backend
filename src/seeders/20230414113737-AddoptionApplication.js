
'use strict'
/** @type {import('sequelize-cli').Migration} */
const { faker } = require('@faker-js/faker')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const accountTypeId = await queryInterface.rawSelect('AccountTypes', {
      where: { title: 'user' }
    }, ['id'])

    const petStatusId = await queryInterface.rawSelect('PetStatuses', {
      where: { statusName: 'Available for adoption' }
    }, ['id'])

    const addoptionApplications = []
    for (let i = 0; i < 10; i++) {
      const userId = await queryInterface.rawSelect('Users', {
        where: { accountTypeId },
        order: queryInterface.sequelize.random()
      }, ['id'])

      const petRecord = await queryInterface.sequelize.query(
        'SELECT id, shelterId FROM Pets WHERE statusId = :statusId ORDER BY RAND() LIMIT 1',
        {
          replacements: { statusId: petStatusId },
          type: queryInterface.sequelize.QueryTypes.SELECT,
          raw: true
        }
      )
      const { id, shelterId } = petRecord[0]

      const statusId = await queryInterface.rawSelect('ApplicationStatuses', {
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
    return queryInterface.bulkInsert('AdoptionApplications', addoptionApplications, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('AdoptionApplications', null, {})
  }
}
