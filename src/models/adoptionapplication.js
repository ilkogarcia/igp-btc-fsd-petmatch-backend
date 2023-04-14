'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class AdoptionApplication extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      AdoptionApplication.belongsTo(models.User, {
        foreignKey: 'userId'
      })

      AdoptionApplication.belongsTo(models.Pet, {
        foreignKey: 'petId'
      })

      AdoptionApplication.belongsTo(models.Shelter, {
        foreignKey: 'shelterId'
      })

      AdoptionApplication.belongsTo(models.ApplicationStatus, {
        foreignKey: 'statusId'
      })

      // define new associations here
    }
  }
  AdoptionApplication.init({
    userId: DataTypes.INTEGER,
    petId: DataTypes.INTEGER,
    shelterId: DataTypes.INTEGER,
    statusId: DataTypes.INTEGER,
    applicationDate: DataTypes.DATE,
    approvalDate: DataTypes.DATE,
    rejectionDate: DataTypes.DATE,
    applicationNotes: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'AdoptionApplication'
  })
  return AdoptionApplication
}
