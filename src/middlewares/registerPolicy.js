/*
 * Middeleware to enforce user register policy.
 * Used in the registerUser controller to check if the request parameters
 * are good enough to create a new user.
 */

const Joi = require('joi')

/**
 *
 * @param {Object} req - An object that includes a body element with data to create a new user in the database.
 * @param {Object} res - An object that will be passed to the next middleware in the stack.
 * @param {Function} next - A function to call the next middleware in the stack.
 */

const registerPolicy = async (req, res, next) => {
  try {
    // Define the schema to validate the request body
    const schema = Joi.object({
      email: Joi.string()
        .email({ tlds: { allow: false } } /* tlds: { allow: false } to avoid emails like test@com */)
        .required(),
      password: Joi.string()
        .pattern(/^[a-zA-Z0-9]{12,32}$/)
        .required()
    })
    // Validate the request body against the schema
    const { email, password } = req.body
    const { error } = await schema.validate({ email, password })
    if (error) {
      return res.status(500).json({
        sucess: false,
        message: 'Something has gone wrong! Try again later.'
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

module.exports = registerPolicy
