
'use strict'
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const specieId = await queryInterface.rawSelect('PetSpecie', {
      where: { specieCommonName: 'Dog' }
    }, ['id'])

    const breeds = [
      {
        specieId,
        breedName: 'Labrador Retriever',
        averageHeight: '55-62 cm',
        averageWeight: '25-32 Kg',
        averageLifeExpectancy: '10-12 years',
        breedDescription: 'Friendly, active, and outgoing, Labrador Retrievers are a popular family dog breed.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        specieId,
        breedName: 'German Shepherd',
        averageHeight: '55-65 cm',
        averageWeight: '22-40 Kg',
        averageLifeExpectancy: '9-13 years',
        breedDescription: 'Loyal, confident, and courageous, the German Shepherd is a breed that has served in many roles throughout history.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        specieId,
        breedName: 'Golden Retriever',
        averageHeight: '55-61 cm',
        averageWeight: '25-36 Kg',
        averageLifeExpectancy: '10-12 years',
        breedDescription: 'Friendly, intelligent, and devoted, the Golden Retriever is a popular breed for families and therapy work.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        specieId,
        breedName: 'Bulldog',
        averageHeight: '31-40 cm',
        averageWeight: '18-25 Kg',
        averageLifeExpectancy: '8-10 years',
        breedDescription: 'Laid back and loyal, Bulldogs are a popular breed for families and apartment dwellers.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        specieId,
        breedName: 'Beagle',
        averageHeight: '33-41 cm',
        averageWeight: '8-14 Kg',
        averageLifeExpectancy: '12-15 years',
        breedDescription: 'Playful and curious, Beagles are a popular breed for families and hunting enthusiasts.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        specieId,
        breedName: 'Poodle',
        averageHeight: '24-28 cm',
        averageWeight: '6-9 Kg',
        averageLifeExpectancy: '12-15 years',
        breedDescription: 'Elegant and intelligent, Poodles are a popular breed for show and companionship.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        specieId,
        breedName: 'Siberian Husky',
        averageHeight: '51-60 cm',
        averageWeight: '16-27 Kg',
        averageLifeExpectancy: '12-15 years',
        breedDescription: 'Friendly and energetic, Siberian Huskies are a popular breed for families and sled dog racing.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        specieId,
        breedName: 'Chihuahua',
        averageHeight: '15-23 cm',
        averageWeight: '1.5-3 Kg',
        averageLifeExpectancy: '12-20 years',
        breedDescription: 'Small and sassy, Chihuahuas are a popular breed for apartment dwellers and city living.',
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
