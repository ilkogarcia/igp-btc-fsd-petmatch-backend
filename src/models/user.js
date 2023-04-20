'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      User.belongsTo(models.AccountType, {
        foreignKey: 'accountTypeId'
      })

      User.belongsTo(models.City, {
        foreignKey: 'cityId'
      })

      User.belongsTo(models.StateProvince, {
        foreignKey: 'stateProvinceId'
      })

      User.belongsTo(models.Country, {
        foreignKey: 'countryId'
      })

      User.hasMany(models.AdoptionApplication, {
        foreignKey: 'userId'
      })

      User.hasMany(models.UserPet, {
        foreignKey: 'userId'
      })

      User.belongsToMany(models.Pet, {
        through: models.UserPet,
        foreignKey: 'userId'
      })

      // define new associations here
    }
  }
  User.init({
    accountTypeId: DataTypes.INTEGER,
    cityId: DataTypes.INTEGER,
    stateProvinceId: DataTypes.INTEGER,
    countryId: DataTypes.INTEGER,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    passwordHash: DataTypes.STRING,
    profilePicture: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    addressLine1: DataTypes.STRING,
    addressLine2: DataTypes.STRING,
    postalCode: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    birthday: DataTypes.DATE,
    gender: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN,
    isVerified: DataTypes.BOOLEAN,
    lastLogin: DataTypes.DATE,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User'
  })
  return User
}
