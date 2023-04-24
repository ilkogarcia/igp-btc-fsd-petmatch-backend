/**
 * @module isAuthorizedOnShelter
 * @description Check if user is authorized to access shelter endpoints
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @param {function} next - Next function
 * @requires module:consts
 */

const USER_ROLES = require('./consts.js')

const isAuthorizedOnShelter = async (req, res, next) => {
  try {
    switch (req.userRole) {
      case USER_ROLES.ADMIN:
        return next()
      case USER_ROLES.SHELTER:
        return next()
      case USER_ROLES.USER:
        if (req.method !== 'GET') {
          return res.status(403).json({
            status: false,
            message: 'Access to this resource is not allowed. Please log in as a registered user to access this resource.'
          })
        } else if (req.path === '/') {
          return res.status(403).json({
            status: false,
            message: 'Access to this resource is not allowed. Please log in as a registered user to access this resource.'
          })
        }
        return next()
      default:
        return res.status(403).json({
          status: false,
          message: 'We have not been able to identify your user role. Please contact a platform administrator.'
        })
    }
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      message: 'We apologize for the inconvenience. Our server encountered an unexpected error while processing your request. Please try again later or contact our support team for assistance.',
      data: error
    })
  }
}

module.exports = isAuthorizedOnShelter
