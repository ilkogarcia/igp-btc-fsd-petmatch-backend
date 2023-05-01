/* eslint-disable comma-dangle */

/**
 * @module middlewares/authPolicies
 * @description This module contains the middlewares to validate the request body against the schema.
 * @requires joi
 */

const Joi = require('joi')

/**
 * @function registerPolicy - Policy to validate the requests that pretend to create a new user.
 * @param {Object} req - An object that includes a body element with data to create a new user in the database.
 * @param {Object} res - An object that will be passed to the next middleware in the stack.
 * @param {Function} next - A function to call the next middleware in the stack.
 */

const registerPolicy = async (req, res, next) => {
  try {
    // Define the schema to validate the request body
    const schema = Joi.object({
      email: Joi.string()
        .email(
          {
            tlds: { allow: false },
          } /* tlds: { allow: false } to avoid emails like test@com */
        )
        .required(),
      password: Joi.string()
        .pattern(/^[a-zA-Z0-9]{12,32}$/)
        .required(),
    })
    // Validate the request body against the schema
    const { email, password } = req.body
    const { error } = await schema.validate({ email, password })

    if (error) {
      return res.status(500).json({
        sucess: false,
        message: 'Something has gone wrong! Try again later.',
      })
    }
    next()
  } catch (error) {
    res.status(500).json({
      sucess: false,
      title: 'Something has gone wrong!',
    })
  }
}

/**
 * @function loginPolicy - Policy to validate the requests that pretend to login a user.
 * @param {Object} req - An object that includes a body element with user credentials.
 * @param {Object} res - An object that will be passed to the next middleware in the stack.
 * @param {Function} next - A function to call the next middleware in the stack.
 */

const loginPolicy = async (req, res, next) => {
  try {
    // Define the schema to validate the request body
    const schema = Joi.object({
      email: Joi.string()
        .email(
          {
            tlds: { allow: false },
          } /* tlds: { allow: false } to avoid emails like test@com */
        )
        .required(),
      password: Joi.string()
        .pattern(/^[a-zA-Z0-9]{12,32}$/)
        .required(),
    })
    // Validate the request body against the schema
    const { email, password } = req.body
    const { error } = await schema.validate({ email, password })
    if (error) {
      return res.status(500).json({
        sucess: false,
        message: 'Unauthorized access.',
      })
    }
    next()
  } catch (error) {
    res.status(500).json({
      sucess: false,
      title: 'Unauthorized access',
    })
  }
}

/**
 * @function resetPasswordPolicy - Policy to validate the requests that pretend to reset a user password.
 * @param {Object} req - An object that includes a body element with user id, token and new password.
 * @param {Object} res - An object that will be passed to the next middleware in the stack.
 * @param {Function} next - A function to call the next middleware in the stack.
 */

const resetPasswordPolicy = async (req, res, next) => {
  try {
    // Define the schema to validate the request body
    const schema = Joi.object({
      userId: Joi.number().integer().min(1).required(),
      newPassword: Joi.string()
        .pattern(/^[a-zA-Z0-9]{12,32}$/)
        .required(),
      // token: Joi.string()
      //   .regex(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/)
      //   .required()
    })
    // Validate the request body against the schema
    const { userId, newPassword } = req.body
    const id = parseInt(userId)
    const { token } = req.query
    const { error } = await schema.validate({ id, newPassword })
    if (error) {
      return res.status(500).json({
        sucess: false,
        message: 'Something has gone wrong! Error in validation.',
      })
    }
    next()
  } catch (error) {
    res.status(500).json({
      sucess: false,
      title: 'Something has gone wrong! Error un catch Block',
      message: error.message,
    })
  }
}

/**
 * @function forgotPasswordPolicy - Policy to validate the requests that pretend to send a reset password email.
 * @param {Object} req - An object that includes a body element with user credentials.
 * @param {Object} res - An object that will be passed to the next middleware in the stack.
 * @param {Function} next - A function to call the next middleware in the stack.
 */

const forgotPasswordPolicy = async (req, res, next) => {
  try {
    // Define the schema to validate the request body
    const schema = Joi.object({
      email: Joi.string()
        .email(
          {
            tlds: { allow: false },
          } /* tlds: { allow: false } to avoid emails like test@com */
        )
        .required(),
    })
    // Validate the request body against the schema
    const { email } = req.body
    const { error } = await schema.validate({ email })
    if (error) {
      return res.status(500).json({
        sucess: false,
        message: 'Something has gone wrong!',
      })
    }
    next()
  } catch (error) {
    res.status(500).json({
      sucess: false,
      title: 'Something has gone wrong!',
    })
  }
}

module.exports = {
  registerPolicy,
  loginPolicy,
  resetPasswordPolicy,
  forgotPasswordPolicy,
}
