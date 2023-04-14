'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      City.belongsTo(models.StateProvince, {
        foreignKey: 'stateProvinceId',
        onDelete: 'CASCADE'
      })

      City.hasMany(models.User, {
        foreignKey: 'cityId'
      })

      City.hasMany(models.Shelter, {
        foreignKey: 'cityId'
      })
    }
  }
  City.init({
    stateProvinceId: DataTypes.INTEGER,
    cityName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'City'
  })
  return City
}
