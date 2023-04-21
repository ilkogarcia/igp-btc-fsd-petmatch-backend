/**
 * @module isAuthorizedOnUser
 * @description Check if user is authorized to access users endpoints
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @param {function} next - Next function
 */

const isAuthorizedOnUser = async (req, res, next) => {
  try {
    switch (req.userRole) {
      case 'administrator':
        return next()
      case 'user':
      case 'shelter':
        // Users don't have access to the root path
        if (req.route.path === '/') {
          return res.status(403).json({
            status: false,
            message: 'Forbiden access to this resource.'
          })
        }
        // Users can access only GET and PUT methods
        if (req.method !== 'GET' && req.method !== 'PUT') {
          return res.status(403).json({
            status: false,
            message: 'Forbiden access to this resource.'
          })
        }
        // Users can access only their own data
        if (req.params.userId && parseInt(req.params.userId) !== req.userId) {
          return res.status(403).json({
            status: false,
            message: 'Forbiden access to this resource.'
          })
        }
        return next()
      default:
        return res.status(401).json({
          status: false,
          message: 'Forbiden access to this resource.'
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

module.exports = isAuthorizedOnUser
