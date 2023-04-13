'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Shelter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      Shelter.hasMany(models.Pet, {
        foreignKey: 'shelterId'
      })

      Shelter.hasMany(models.AddoptionApplication, {
        foreignKey: 'shelterId'
      })

      Shelter.belongsTo(models.City, {
        foreignKey: 'cityId'
      })

      Shelter.belongsTo(models.StateProvince, {
        foreignKey: 'stateProvinceId'
      })

      Shelter.belongsTo(models.Country, {
        foreignKey: 'countryId'
      })

      // define other association here
    }
  }
  Shelter.init({
    cityId: DataTypes.INTEGER,
    stateProvinceId: DataTypes.INTEGER,
    countryId: DataTypes.INTEGER,
    addressLine1: DataTypes.STRING,
    addressLine2: DataTypes.STRING,
    postalCode: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    contactEmail: DataTypes.STRING,
    contactPhone: DataTypes.STRING,
    webUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Shelter'
  })
  return Shelter
}
