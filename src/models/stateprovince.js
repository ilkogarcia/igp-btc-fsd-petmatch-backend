'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class StateProvince extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      StateProvince.belongsTo(models.Country, {
        foreignKey: 'countryId',
        onDelete: 'CASCADE'
      })

      StateProvince.hasMany(models.City, {
        foreignKey: 'stateProvinceId'
      })

      StateProvince.hasMany(models.User, {
        foreignKey: 'userId'
      })
    }
  }
  StateProvince.init({
    countryId: DataTypes.INTEGER,
    stateProvinceName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'StateProvince'
  })
  return StateProvince
}
