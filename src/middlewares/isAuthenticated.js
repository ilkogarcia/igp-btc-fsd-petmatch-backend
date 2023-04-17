/* 
* Determine if user is authenticated by checking if the token used in the request
* is valid. Returning a 401 unauthorized error if the token is invalid.
*/
require('dotenv').config()
const jwt = require('jsonwebtoken')
const { User } = require('../models')

/**
 * Verify token received, decoded and handle some errors.
 * 
 * @param {string} token - JWT token 
 * @param {string} secret -
 * @returns - Decoded token
 */

const verifyToken = async (token, secret) => {
  try {
    const decodedToken = await jwt.verify(token, secret)
    return decodedToken
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw { code: 'TOKEN_EXPIRED', message: `Token expired: ${error.message}` };
    } else if (error instanceof jwt.JsonWebTokenError) {
      throw { code: 'INVALID_TOKEN', message: `Invalid token: ${error.message}` };
    } else if (error instanceof jwt.NotBeforeError) {
      throw { code: 'TOKEN_NOT_YET_VALID', message: `Token not yet valid: ${error.message}` };
    } else if (error instanceof TypeError) {
      throw { code: 'INVALID_TOKEN_OR_OPTIONS', message: `Invalid token or options: ${error.message}` };
    }
      throw { code: 'UNKNOWN_ERROR', message: `Unknown error: ${error.message}` };
  }
}

/**
 * Middleware to determine if user is authenticated.
 * 
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @param {function} next - Next function
 * @returns - Response object
 */

const isAuthenticated = async (req, res, next) => {
  try {
    // Retrive token from request header
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
        return res.status(401).json({
        sucess: false,
        message: 'Unauthorized - No token provided'
        })
    }

    // Decode and verify token received
    const decodedToken = await verifyToken(token, process.env.JWT_SECRET)
    if (!decodedToken) {
        return res.status(401).json({
        sucess: false,
        message: 'Unauthorized - Invalid token',
        data : {
            error
        }
        })
    }
    // Request will be denied if user id decoded from token is not found in database
    const user = await User.findByPk(decodedToken.userId)
    if (!user) {
        return res.status(401).json({
        sucess: false,
        message: 'Unauthorized - User not found'
        })
    }

    // Add user data to the request
    req.userId = decodedToken.userId
    req.userEmail = decodedToken.userEmail
    req.userRole = decodedToken.userRole

    console.log('User is authenticated', req.userId, req.userEmail, req.userRole)
    next()
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      message: error?.message || 'Internal server error',
      data: error
    })
  }
}

module.exports = isAuthenticated
