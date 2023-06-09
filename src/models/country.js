'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Country extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      Country.hasMany(models.StateProvince, {
        foreignKey: 'countryId'
      })

      Country.hasMany(models.User, {
        foreignKey: 'countryId'
      })

      Country.hasMany(models.Shelter, {
        foreignKey: 'countryId'
      })
    }
  }
  Country.init({
    alpha2CountryCode: DataTypes.STRING,
    alpha3CountryCode: DataTypes.STRING,
    numericCountryCode: DataTypes.STRING,
    countryName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Country'
  })
  return Country
}
