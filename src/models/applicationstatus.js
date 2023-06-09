'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class ApplicationStatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      ApplicationStatus.hasMany(models.AdoptionApplication, {
        foreignKey: 'statusId'
      })

      // define association here
    }
  }
  ApplicationStatus.init({
    statusName: DataTypes.STRING,
    statusDescription: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ApplicationStatus'
  })
  return ApplicationStatus
}
