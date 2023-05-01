/* eslint-disable comma-dangle */
/* eslint-disable no-throw-literal */
/**
 * @module services/userService
 * @description User services
 * @requires sequelize/lib/operators
 * @requires models/index
 */

// Import dependencies
const { Op } = require('sequelize')

// Import models used by this service
const { User, AccountType, City, StateProvince, Country } = require('../models')

/**
 * CRUD: Create a new user in database.
 * @param {Object} newUser - An object that includes all the user data to be created.
 * @returns {Object} createdUser - An object that includes all the user data that was created.
 */

const createNewUser = async (newUser) => {
  try {
    // Create the new user with all the data passed in the newUser object
    const createdUser = await User.create(newUser)

    return createdUser
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || 'Internal server error.',
    }
  }
}

/**
 * CRUD: Get one existing user by id from the database.
 * @param {Number} userId - The id of the user to retrieve.
 * @returns {Object} user - An object that includes all the user data that was retrieved.
 */

const getOneUser = async (userId) => {
  try {
    // Get the user by id and throw an error if not found
    const user = await User.findByPk(userId)
    if (!user) {
      throw {
        status: 404,
        message: `Can't find user with the id '${userId}'.`,
      }
    }

    return user
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || 'Internal server error.',
    }
  }
}

/**
 * CRUD: Update one existing user by id in the database.
 * @param {Number} userId - The id of the user to update.
 * @param {Object} userData - An object that includes all the user data to be updated.
 * @returns {Object} updatedUser - An object that includes all the user data that was updated.
 */

const updateOneUser = async (userId, userData) => {
  try {
    // Update the user if not found throw an error
    const updatedResult = await User.update(userData, {
      where: { id: userId },
    })
    if (updatedResult[0] === 0 || !updatedResult) {
      throw {
        status: 404,
        message: `Can't update user with the id '${userId}'.`,
      }
    }

    // Get all info from the updated user
    const updatedUser = await User.findByPk(userId)

    return updatedUser
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || 'Internal server error.',
    }
  }
}

/**
 * CRUD: Delete one existing user by id from the database.
 * @param {Number} userId - The id of the user to delete.
 * @returns {Object} userToDelete - An object that includes all the user data that was deleted.
 */

const deleteOneUser = async (userId) => {
  try {
    // Find the user to delete by id and throw an error if not found
    const userToDelete = await User.findByPk(userId)
    if (!userToDelete) {
      throw {
        status: 404,
        message: `Can't find user with the id '${userId}'.`,
      }
    }

    // Delete the user and throw an error in case of failure
    const deletedResult = await User.destroy({
      where: { id: userId },
    })
    if (!deletedResult) {
      throw {
        status: 404,
        message: `Can't delete user with the id '${userId}'.`,
      }
    }

    return userToDelete
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || 'Internal server error.',
    }
  }
}

/**
 * Get all existing users from the database.
 * @param {Number} limit - The number of users to retrieve.
 * @param {Number} offset - The number of users to skip.
 * @param {Object} filterParams - An object that includes all the filter params to be applied.
 * @param {Object} orderParams - An object that includes all the order params to be applied.
 * @returns {Object} users - An object that includes all the users data that was retrieved.
 */

const getAllUsers = async (limit, offset, filterParams, orderParams) => {
  try {
    // Desctructure the filterParams object to get the filter values
    const {
      accountType,
      city,
      stateProvince,
      country,
      postalCode,
      gender,
      active,
      verified,
    } = filterParams

    // Conditions to be used in all where clauses
    const accounCondition = accountType
      ? { title: { [Op.like]: `${accountType}` } }
      : {}
    const cityCondition = city ? { cityName: { [Op.like]: `${city}` } } : {}
    const stateCondition = stateProvince
      ? { stateProvinceName: { [Op.like]: `${stateProvince}` } }
      : {}
    const countryCondition = country
      ? { countryName: { [Op.like]: `${country}` } }
      : {}
    const postalCodeCondition = postalCode
      ? { postalCode: { [Op.like]: `${postalCode}` } }
      : {}
    const genderCondition = gender ? { gender: { [Op.like]: `${gender}` } } : {}
    const activeCondition = active
      ? { isActive: { [Op.like]: `${active}` } }
      : {}
    const verifiedCondition = verified
      ? { isVerified: { [Op.like]: `${verified}` } }
      : {}

    // Order conditions to be used in the query
    const orderConditions = orderParams
      ? orderParams.map((order) => [order.field, order.direction])
      : [['id', 'ASC']]

    // Get all users from the database applying the conditions, sorting and pagination
    const users = await User.findAndCountAll({
      where: {
        ...activeCondition,
        ...verifiedCondition,
        ...genderCondition,
        ...postalCodeCondition,
      },
      include: [
        {
          model: AccountType,
          where: { ...accounCondition },
          required: true,
        },
        {
          model: City,
          where: { ...cityCondition },
          required: true,
          include: [
            {
              model: StateProvince,
              where: { ...stateCondition },
              required: true,
              include: [
                {
                  model: Country,
                  where: { ...countryCondition },
                  required: true,
                },
              ],
            },
          ],
        },
      ],
      limit,
      offset,
      order: orderConditions,
    })

    return users
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || 'Internal server error.',
    }
  }
}

/**
 * Find a user by email address.
 * @param {String} userEmail - The email address of the user to find.
 * @returns {Object} user - An object that includes all the user data that was found.
 */

const findOneUser = async (filterParams) => {
  try {
    // Desctructure the filterParams object to get the filter values
    const { userId, userEmail } = filterParams

    // Conditions to be used in all where clauses
    const idCondition = userId ? { id: { [Op.eq]: `${userId}` } } : {}
    const emailCondition = userEmail
      ? { email: { [Op.eq]: `${userEmail}` } }
      : {}

    // Get the user by email and throw an error if not found
    const user = await User.findOne({
      where: { ...idCondition, ...emailCondition },
    })
    if (!user) {
      throw {
        status: 404,
        message: "Can't find user with that id or email.",
      }
    }

    return user
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || 'Internal server error.',
    }
  }
}

module.exports = {
  createNewUser,
  getOneUser,
  updateOneUser,
  deleteOneUser,
  getAllUsers,
  findOneUser,
}
