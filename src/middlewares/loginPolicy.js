/*
 * Middeleware to enforce user login policy.
 * Used in the loginUser controller to check the request parameters.
 */

const Joi = require('joi')

/**
 *
 * @param {Object} req - An object that includes a body element with user credentials.
 * @param {Object} res - An object that will be passed to the next middleware in the stack.
 * @param {Function} next - A function to call the next middleware in the stack.
 */

const loginPolicy = async (req, res, next) => {
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
        message: 'Unauthorized access.'
      })
    }
    next()
  } catch (error) {
    res.status(500).json({
      sucess: false,
      title: 'Unauthorized access'
    })
  }
}

module.exports = loginPolicy
