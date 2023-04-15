'use strict'
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const species = [
      {
        specieCommonName: 'Dog',
        specieScientificName: 'Canis lupus familiaris',
        specieDescription: 'Dogs are loyal companions and are known for their ability to form close bonds with their owners. They come in a wide variety of breeds, each with their own unique traits and personalities.',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        specieCommonName: 'Cat',
        specieScientificName: 'Felis catus',
        specieDescription: 'Cats are independent and curious creatures, known for their agility and playful behavior. They come in a variety of breeds and are often kept as indoor pets.',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        specieCommonName: 'Fish',
        specieScientificName: 'Cyprinidae',
        specieDescription: 'Fish are popular pets for their vibrant colors and calming presence. They require a well-maintained tank with a proper filtration system to thrive.',
        isActive: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        specieCommonName: 'Bird',
        specieScientificName: 'Aves',
        specieDescription: 'Birds are highly intelligent and social animals, known for their ability to mimic human speech and songs. Popular pet bird species include parrots, canaries, and finches.',
        isActive: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        specieCommonName: 'Hamster',
        specieScientificName: 'Cricetinae',
        specieDescription: 'Hamsters are small, furry rodents that are easy to care for and fun to watch. They are active at night and require a well-maintained cage with plenty of toys and exercise equipment.',
        isActive: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        specieCommonName: 'Rabbit',
        specieScientificName: 'Oryctolagus cuniculus',
        specieDescription: 'Rabbits are social animals that make great pets for families. They require a large cage or outdoor space to roam, as well as plenty of fresh hay and vegetables to eat.',
        isActive: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        specieCommonName: 'Guinea Pig',
        specieScientificName: 'Cavia porcellus',
        specieDescription: 'Guinea pigs are social and friendly pets that are often kept in pairs. They require a well-maintained cage with plenty of hay, fresh vegetables, and water.',
        isActive: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        specieCommonName: 'Turtle',
        specieScientificName: 'Testudines',
        specieDescription: 'Turtles are fascinating creatures that make unique and interesting pets. They require a large tank with a basking area and proper lighting to stay healthy.',
        isActive: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]

    return queryInterface.bulkInsert('PetSpecies', species, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('PetSpecies', null, {})
  }
}
