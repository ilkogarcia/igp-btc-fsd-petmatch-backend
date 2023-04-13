'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class PetBreed extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      PetBreed.belongsTo(models.PetSpecie, {
        foreignKey: 'specieId',
        onDelete: 'CASCADE'
      })

      PetBreed.hasMany(models.Pet, {
        foreignKey: 'petId'
      })
    }
  }
  PetBreed.init({
    specieId: DataTypes.INTEGER,
    breedName: DataTypes.STRING,
    averageHeight: DataTypes.STRING,
    averageWeight: DataTypes.STRING,
    averageLifeExpectancy: DataTypes.STRING,
    breedDescription: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PetBreed'
  })
  return PetBreed
}
