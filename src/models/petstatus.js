'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class PetStatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      PetStatus.hasMany(models.Pet, {
        foreignKey: 'statusId'
      })
    }
  }
  PetStatus.init({
    statusName: DataTypes.STRING,
    statusDescription: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PetStatus'
  })
  return PetStatus
}
