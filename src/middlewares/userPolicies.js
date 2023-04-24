/**
 * @module middlewares/userPolicies
 * @description Contains the middlewares to validate the requests that pretend to create, retrieve, update or delete a user. 
 * @requires joi
 */

const Joi = require('joi')

/**
 * @function newUserPolicy - Policy to validate the requests that pretend to create a new user.
 * @param {Object} req - An object that includes a body element with user data.
 * @param {Object} res - An object that will be passed to the next middleware in the stack.
 * @param {Function} next - A function to call the next middleware in the stack.
 */

const newUserPolicy = async (req, res, next) => {
  try {
    // Define the schema to validate required user data
    const userSchema = Joi.object({
      accountTypeId: Joi.number().required(),
      cityId: Joi.number(),
      stateProvinceId: Joi.number(),
      countryId: Joi.number(),
      username: Joi.string().alphanum().min(6).max(30),
      email: Joi.string()
        .email({ tlds: { allow: false } } /* tlds: { allow: false } to avoid emails like test@com */)
        .required(),
      password: Joi.string()
        .pattern(/^[a-zA-Z0-9]{12,32}$/)
        .required(),
      profilePicture: Joi.string(),
      firstName: Joi.string(),
      lastName: Joi.string(),
      addressLine1: Joi.string(),
      addressLine2: Joi.string(),
      postalCode: Joi.string()
        .pattern(/^[0-9]{5}$/),
      phoneNumber: Joi.string()
        .regex(/^[0-9]{9}$/),
      birthday: Joi.date(),
      gender: Joi.string()
        .valid('Male', 'Female', 'Other')
    })

    // Validate the request body against the schema
    const { error } = await userSchema.validate({ ...req.body })
    if (error) {
      return res.status(500).json({
        sucess: false,
        message: 'Unauthorized access.',
        error: error.details[0].message
      })
    }

    next()
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: 'Something went wrong in the server during the user policy validation.',
      data: error
    })
  }
}

/**
 * @function getUserPolicy - Policy to validate the requests that pretend to retrieve a user.
 * @param {Object} req - An object that contains the id of the user that you want to retrieve from the database.
 * @param {Object} res - An object that will be passed to the next middleware in the stack.
 * @param {Function} next - A function to call the next middleware in the stack.
 */

const getUserPolicy = async (req, res, next) => {
  try {
    const { params: { userId } } = req
    if (!userId) {
      return res.status(400).json({
        status: false,
        message: 'Parameter \':userId\' can not be empty'
      })
    }
    next()
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: 'Something went wrong in the server during the user policy validation.',
      data: error
    })
  }
}

/**
 * @function updateUserPolicy - Policy to validate the requests that pretend to update a user.
 * @param {Object} req - An object that includes user id and data changes.
 * @param {Object} res - An object that will be passed to the next middleware in the stack.
 * @param {Function} next - A function to call the next middleware in the stack.
 */

const updateUserPolicy = async (req, res, next) => {
  try {
    next()
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: 'Something went wrong!',
      data: error
    })
  }
}

/**
 * @function deleteUserPolicy - Policy to validate the requests that pretend to delete a user.
 * @param {Object} req - An object that includes user id and data changes.
 * @param {Object} res - An object that will be passed to the next middleware in the stack.
 * @param {Function} next - A function to call the next middleware in the stack.
 */

const deleteUserPolicy = async (req, res, next) => {
  try {
    next()
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: 'Something went wrong in the server during the user policy validation.',
      data: error
    })
  }
}

/**
 * @function getAllUsersPolicy - Policy to validate the requests that pretend to retrieve all users.
 * @param {Object} req - An object that includes user id and data changes.
 * @param {Object} res - An object that will be passed to the next middleware in the stack.
 * @param {Function} next - A function to call the next middleware in the stack.
 */

const getAllUsersPolicy = async (req, res, next) => {
  try {
    next()
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: 'Something went wrong in the server during the user policy validation.',
      data: error
    })
  }
}

module.exports = {
  newUserPolicy,
  getUserPolicy,
  updateUserPolicy,
  deleteUserPolicy,
  getAllUsersPolicy
}
