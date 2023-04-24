/**
 * @module isAuthorized
 * @description Middleware to determine if user is authorized to...
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @param {function} next - Next function
 * @requires module:consts
 */

const USER_ROLES = require('./consts.js')

const isAuthorized = async (req, res, next) => {
  try {
    switch (req.userRole) {
      case USER_ROLES.ADMIN:
        return next()
      case USER_ROLES.USER:
        return next()
      case USER_ROLES.SHELTER:
        return next()
      default:
        return res.status(401).json({
          status: false,
          message: 'You user role is not authorized to access this resource'
        })
    }
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      message: error?.message || 'Internal server error',
      data: error
    })
  }
}

module.exports = isAuthorized
