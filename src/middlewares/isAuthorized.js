/*
* Determine if user has authorization by checking his account type set in the session(token).
* Returning a 401 unauthorized error if the token is invalid.
*/

/**
 * Middlweware to determine if user is authorized
 * to access the specific resource.
 *
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @param {function} next - Next function
 */

const isAuthorized = async (req, res, next) => {
  try {
    // Check if user is an administrator
    if (req.userRole === 'administrator') {
      return next()
    }

    // Check if user is a shelter
    if (req.userRole === 'shelter') {
      return next()
    }

    // Check if user is a regular user
    if (req.userRole === 'user') {
      // Only allow GET requests
      if (req.method !== 'GET') {
        return res.status(403).json({
          sucess: false,
          message: 'Forbidden access to this resource'
        })
      }
      return next()
    }

    // User is not authorized
    return res.status(401).json({
      sucess: false,
      message: 'Unauthorized'
    })
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      message: error?.message || 'Internal server error',
      data: error
    })
  }
}

module.exports = isAuthorized
