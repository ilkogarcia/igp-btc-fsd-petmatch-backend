
'use strict'
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const specieId = await queryInterface.rawSelect('PetSpecie', {
      where: { specieCommonName: 'Cat' }
    }, ['id'])

    const breeds = [
      {
        specieId,
        breedName: 'Siamese',
        averageHeight: '25-30 cm',
        averageWeight: '3.5-5.5 kg',
        averageLifeExpectancy: '12-20 years',
        breedDescription: 'Siamese cats are social, affectionate, clever animals who make loving and loyal pets. These kitties mesh well into most families.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        specieId,
        breedName: 'Persian',
        averageHeight: '25-30 cm',
        averageWeight: '3.5-5.5 kg',
        averageLifeExpectancy: '12-18 years',
        breedDescription: 'The Persian Cat is a muscly, heavy-boned, medium- to large-sized cat with short, thick legs, big paws, large shoulders, a short neck, broad chest, and relatively short tail.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        specieId,
        breedName: 'Bengal',
        averageHeight: '25-30 cm',
        averageWeight: '4.5-6.5 kg',
        averageLifeExpectancy: '12-16 years',
        breedDescription: 'While many people consider the Bengal to be a wild cat that only pretends to be domesticated, the breed is actually very sweet and loving.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        specieId,
        breedName: 'Sphynx',
        averageHeight: '20-25 cm',
        averageWeight: '3-5 kg',
        averageLifeExpectancy: '8-14 years',
        breedDescription: 'Aside from their hairless bodies, sphynxes are known for their lemon-shaped eyes, nimble toes, big ears, and round belly.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        specieId,
        breedName: 'Maine Coon',
        averageHeight: '25-30 cm',
        averageWeight: '4.5-8 kg',
        averageLifeExpectancy: '12-15 years',
        breedDescription: 'Maine Coons are known for being friendly, affectionate and goofy they are not only huge in size but also huge in personality.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        specieId,
        breedName: 'British Shorthair',
        averageHeight: '25-30 cm',
        averageWeight: '4-7 kg',
        averageLifeExpectancy: '12-17 years',
        breedDescription: 'The British Shorthair is a medium to large sized, compact, chunky cat, known for their attractive features and thick, plush fur.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        specieId,
        breedName: 'Russian Blue',
        averageHeight: '25-30 cm',
        averageWeight: '3.5-5.5 kg',
        averageLifeExpectancy: '10-16 years',
        breedDescription: 'Russian blues are known for their thick, gorgeous blue-gray coat and bright eyes. These cats are sweet, loyal, and cautious animals who love having a routine.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        specieId,
        breedName: 'Scottish Fold',
        averageHeight: '20-25 cm',
        averageWeight: '2.5-5.5 kg',
        averageLifeExpectancy: '11-14 years',
        breedDescription: 'The Scottish Fold is seemingly made entirely of curves. This rounded, medium sized cat is compact and solid, with a round head, large round eyes.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        specieId,
        breedName: 'Ragdoll',
        averageHeight: '25-30 cm',
        averageWeight: '4-9 kg',
        averageLifeExpectancy: '12-17 years',
        breedDescription: 'The Ragdoll is a breed of cat with a distinct colorpoint coat and blue eyes. Its morphology is large and weighty, and it has a semi-long and silky soft coat.',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]

    return queryInterface.bulkInsert('PetBreed', breeds, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('PetBreed', null, {})
  }
}
