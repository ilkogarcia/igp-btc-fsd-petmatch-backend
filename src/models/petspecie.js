'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class PetSpecie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      PetSpecie.hasMany(models.PetBreed, {
        foreignKey: 'specieId'
      })

      PetSpecie.hasMany(models.Pet, {
        foreignKey: 'specieId'
      })
    }
  }
  PetSpecie.init({
    specieCommonName: DataTypes.STRING,
    specieScientificName: DataTypes.STRING,
    specieDescription: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'PetSpecie'
  })
  return PetSpecie
}
