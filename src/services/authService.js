/* eslint-disable comma-dangle */
/* eslint-disable no-throw-literal */

/**
 * @module services/authService
 * @description Auth services
 * @requires models/index
 */

// Import models used by this service
const { User } = require('../models')

/**
 * @function checkUserEmailExists
 * @description Check if user exists in database.
 * @param {String} email - The email of the user to check.
 * @returns {Boolean} - Returns true if user exists, false if not.
 * @throws {Object} - Returns an error object with status and message.
 */

const checkUserEmailExists = async ({ email }) => {
  try {
    // Check if user exists
    const user = await User.findOne({ where: { email } })
    if (!user) {
      return false
    } else {
      return true
    }
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || 'Internal server error.',
    }
  }
}

module.exports = {
  checkUserEmailExists,
}
