'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Pet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      Pet.belongsTo(models.Shelter, {
        foreignKey: 'shelterId'
      })

      Pet.belongsTo(models.PetSpecie, {
        foreignKey: 'specieId'
      })

      Pet.belongsTo(models.PetBreed, {
        foreignKey: 'breedId'
      })

      Pet.belongsTo(models.PetStatus, {
        foreignKey: 'statusId'
      })

      Pet.hasMany(models.UserPet, {
        foreignKey: 'petId'
      })

      Pet.hasMany(models.AdoptionApplication, {
        foreignKey: 'petId'
      })

      Pet.belongsToMany(models.User, {
        through: models.UserPet,
        foreignKey: 'petId'
      })

      // define new associations here
    }
  }
  Pet.init({
    specieId: DataTypes.INTEGER,
    breedId: DataTypes.INTEGER,
    gender: DataTypes.STRING,
    shelterId: DataTypes.INTEGER,
    statusId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    description: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    vaccinationStatus: DataTypes.STRING,
    spayedNeutered: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Pet'
  })
  return Pet
}
