/*
 * Middeleware to enforce user forgotten password policy.
 * Used in the forgotPassword controller to check the request parameters.
 * @module src/middlewares/forgotPasswordPolicy
 */

const Joi = require('joi')

/**
 *
 * @param {Object} req - An object that includes a body element with user credentials.
 * @param {Object} res - An object that will be passed to the next middleware in the stack.
 * @param {Function} next - A function to call the next middleware in the stack.
 */

const forgotPasswordPolicy = async (req, res, next) => {
  try {
    // Define the schema to validate the request body
    const schema = Joi.object({
      email: Joi.string()
        .email({ tlds: { allow: false } } /* tlds: { allow: false } to avoid emails like test@com */)
        .required()
    })
    // Validate the request body against the schema
    const { email } = req.body
    const { error } = await schema.validate({ email })
    if (error) {
      return res.status(500).json({
        sucess: false,
        message: 'Something has gone wrong!'
      })
    }
    next()
  } catch (error) {
    res.status(500).json({
      sucess: false,
      title: 'Something has gone wrong!'
    })
  }
}

module.exports = forgotPasswordPolicy
