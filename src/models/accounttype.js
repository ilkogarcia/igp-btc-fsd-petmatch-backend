'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class AccountType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      AccountType.hasMany(models.User, {
        foreignKey: 'userId'
      })
    }
  }
  AccountType.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    permissions: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'AccountType'
  })
  return AccountType
}
