'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class UserPet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      UserPet.belongsTo(models.Pet, {
        foreignKey: 'petId'
      })

      UserPet.belongsTo(models.User, {
        foreignKey: 'userId'
      })

      // define new associations here
    }
  }
  UserPet.init({
    userId: DataTypes.INTEGER,
    petId: DataTypes.INTEGER,
    myFavorite: DataTypes.BOOLEAN,
    isSaved: DataTypes.BOOLEAN,
    hasLike: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'UserPet'
  })
  return UserPet
}
