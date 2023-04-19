/*
 * Middeleware to enforce user reset password policy.
 * Used in the resetPassword controller to check the request parameters.
 * @module src/middlewares/resetPasswordPolicy
 */

const Joi = require('joi')

/**
 *
 * @param {Object} req - An object that includes a body element with user id, token and new password.
 * @param {Object} res - An object that will be passed to the next middleware in the stack.
 * @param {Function} next - A function to call the next middleware in the stack.
 */

const resetPasswordPolicy = async (req, res, next) => {
  try {
    // Define the schema to validate the request body
    const schema = Joi.object({
      userId: Joi.number()
        .integer().min(1)
        .required(),
      newPassword: Joi.string()
        .pattern(/^[a-zA-Z0-9]{12,32}$/)
        .required()
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
        message: 'Something has gone wrong! Error in validation.'
      })
    }
    next()
  } catch (error) {
    res.status(500).json({
      sucess: false,
      title: 'Something has gone wrong! Error un catch Block',
      message: error.message
    })
  }
}

module.exports = resetPasswordPolicy
