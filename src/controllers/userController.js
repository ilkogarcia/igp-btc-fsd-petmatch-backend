/**
 * @file userController.js
 * @description User controller
 */

// Import dependencies
const bcrypt = require('bcrypt')

// Import services
const UserService = require('../services/userService')

/**
 * CRUD: Create a new user in database.
 * @param {Object} req - An object that includes a body element with data to create a new user.
 * @returns {Object} res - An object in JSON format that includes all info from the recently created user.
 */

const createNewUser = async (req, res) => {
  try {
    const {
      body: {
        accountTypeId,
        cityId,
        stateProvinceId,
        countryId,
        username,
        email,
        password,
        profilePicture,
        firstName,
        lastName,
        addressLine1,
        addressLine2,
        postalCode,
        phoneNumber,
        birthday,
        gender
      }
    } = req

    // Generate the hash of the password
    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)

    // Create a newUser object to pass it as an argument to the service
    const newUser = {
      accountTypeId,
      cityId,
      stateProvinceId,
      countryId,
      username,
      email,
      passwordHash,
      profilePicture,
      firstName,
      lastName,
      addressLine1,
      addressLine2,
      postalCode,
      phoneNumber,
      birthday,
      gender,
      isActive: true,
      isVerified: false
    }

    const createdUser = await UserService.createNewUser(newUser)
    return res.status(201).json({
      sucess: true,
      message: 'Successfully added the new user to the database.',
      data: createdUser || []
    })
  } catch (error) {
    return res.status(error?.status || 500).json({
      sucess: false,
      message: error?.message || 'Internal server error.',
      data: error
    })
  }
}

/**
   * CRUD: Get an existing user from the database.
   * @param {Object} req - An object that includes as a parameter the user Id to be deleted.
   * @returns {Object} res - An object in JSON format that includes the retrieved user info.
   */

const getOneUser = async (req, res) => {
  try {
    const { params: { userId } } = req
    if (!userId) {
      return res.status(400).json({
        status: false,
        message: 'Parameter \':userId\' can not be empty'
      })
    }

    if (req.userRole !== 'administrator' && req.userId !== userId) {
      return res.status(401).json({
        status: false,
        message: 'You are not authorized to access this resource'
      })
    }

    const user = await UserService.getOneUser(userId)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: `Can't find a user with the id '${userId}'.`
      })
    }
    return res.status(201).json({
      sucess: true,
      message: `User with the id '${userId}' recovered successfully.`,
      data: user || []
    })
  } catch (error) {
    return res.status(error?.status || 500).json({
      sucess: false,
      message: error?.message || 'Internal server error.',
      data: error || []
    })
  }
}

/**
   * CRUD: Update an existing user in database by his Id.
   * @param {Object} req - An object that includes the user Id to be updated and the data to update
   * @returns {Object} res - An object in JSON format that includes the updated user info.
   */

const updateOneUser = async (req, res) => {
  try {
    // Get the user Id from the request parameters
    const { params: { userId } } = req
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: `User ID ${userId} parameter are missing in your request.`
      })
    }
    // Get the user data from the request body
    const { body: userData } = req
    if (!userData) {
      return res.status(400).json({
        success: false,
        message: 'User data parameter are missing in your request.'
      })
    }
    // Update the user in the database
    const updatedUser = await UserService.updateOneUser(userId, userData)
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: `Can't find User with the id '${userId}'.`
      })
    }
    return res.status(201).json({
      sucess: true,
      message: `User with the id '${userId}' was updated successfully`,
      data: updatedUser || []
    })
  } catch (error) {
    return res.status(error?.status || 500).json({
      sucess: false,
      message: error?.message || 'Internal server error.',
      data: error
    })
  }
}

/**
   * CRUD: Delete an existing user in the database by his Id.
   * @param {Object} req - An object that includes as a parameter the user Id to be deleted.
   * @returns {Object} res - An object in JSON format that includes the deleted user info.
   */

const deleteOneUser = async (req, res) => {
  try {
    const { params: { userId } } = req
    if (!userId) {
      return res.status(404).json({
        success: false,
        message: `User ID ${userId} parameter are missing in your request.`
      })
    }
    const deletedUser = await UserService.deleteOneUser(userId)
    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: `Can't find user with the id '${userId}'.`
      })
    }
    return res.status(201).json({
      sucess: true,
      message: `User with the id '${userId}' was deleted successfully`,
      data: deletedUser || []
    })
  } catch (error) {
    return res.status(error?.status || 500).json({
      sucess: false,
      message: error?.message || 'Internal server error.',
      data: error
    })
  }
}

/**
   * Retrieves all users that match a specific query.
   * @param {Object} req - An object that includes pagination, filtering and ordering parameters to be applied.
   * @returns {Object} res - An object in JSON format that includes all users recovered in an array.
   */

const getAllUsers = async (req, res) => {
  try {
    // Set pagination parameters
    const limit = parseInt(req.query.limit) || 5
    const page = parseInt(req.query.page) || 1
    // TODO: refactor to use default values in case <= 0
    if (limit <= 0 || page <= 0) {
      return res.status(400).json({
        status: false,
        message: 'Pagination parameters \'limit\' and \'page\' have to be greater than 0.'
      })
    }
    // Calculate offset for pagination
    const offset = (page - 1) * limit

    // Set filter and order parameters
    const { filterParams } = req.body
    const { orderParams } = req.body

    // Get all users from database applying pagination, order and filter parameters
    const users = await UserService.getAllUsers(limit, offset, filterParams, orderParams)
    if (!users) {
      return res.status(404).json({
        sucess: false,
        message: 'Can\'t find more Users on database at this time.'
      })
    }
    return res.status(201).json({
      sucess: true,
      message: 'Users info recovered successfully.',
      info: {
        total: users.count,
        limit,
        page,
        offset
      },
      data: {
        users: users.rows || []
      }

    })
  } catch (error) {
    return res.status(error?.status || 500).json({
      sucess: false,
      message: error?.message || 'Internal server error.',
      data: error
    })
  }
}

module.exports = {
  createNewUser,
  getOneUser,
  updateOneUser,
  deleteOneUser,
  getAllUsers
}
