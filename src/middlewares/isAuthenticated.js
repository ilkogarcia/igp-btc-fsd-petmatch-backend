/* eslint-disable no-throw-literal */
/**
 * @module middlewares/isAuthenticated
 * @description Determine if user is authenticated by checking if the token used in the request is valid.
 * @requires module:dotenv
 * @requires module:jsonwebtoken
 * @requires module:../helpers/auth
 * @requires module:../models
*/

// Import dependencies used on this module
require('dotenv').config()
const jwt = require('jsonwebtoken')

// Import helpers used on this module
const { isBlacklisted } = require('../helpers/auth')

// Import models used on this module
const { User } = require('../models')

/**
 * @function verifyToken - Verify if token is valid
 * @param {string} token - JWT token
 * @param {string} secret - Secret key
 * @returns - Decoded token
 */

const verifyToken = async (token, secret) => {
  try {
    const decodedToken = await jwt.verify(token, secret)
    return decodedToken
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw { code: 'TOKEN_EXPIRED', message: `Token expired: ${error.message}` }
    } else if (error instanceof jwt.JsonWebTokenError) {
      throw { code: 'INVALID_TOKEN', message: `Invalid token: ${error.message}` }
    } else if (error instanceof jwt.NotBeforeError) {
      throw { code: 'TOKEN_NOT_YET_VALID', message: `Token not yet valid: ${error.message}` }
    } else if (error instanceof TypeError) {
      throw { code: 'INVALID_TOKEN_OR_OPTIONS', message: `Invalid token or options: ${error.message}` }
    }
    throw { code: 'UNKNOWN_ERROR', message: `Unknown error: ${error.message}` }
  }
}

/**
 * @function isAuthenticated - Middleware to determine if user is authenticated to access a resource
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @param {function} next - Next function
 */

const isAuthenticated = async (req, res, next) => {
  try {
    // Check if authorization header is present
    const authHeader = req.headers.authorization
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized. Authorization header missing'
      })
    }

    // Check if authorization header is valid
    const [scheme, token] = authHeader.split(' ')
    if (!/^Bearer$/i.test(scheme) || !token) {
      return res.status(401).json({
        sucess: false,
        message: 'Unauthorized. Invalid scheme used in authorization header'
      })
    }

    // Check if token is provided
    if (!token) {
      return res.status(401).json({
        sucess: false,
        message: 'Unauthorized. No token provided'
      })
    }

    // Check if token is in blacklist

    if (isBlacklisted(token)) {
      return res.status(401).json({
        sucess: false,
        message: 'Unauthorized. Token is in blacklist'
      })
    }

    // Decode and verify token received
    const decodedToken = await verifyToken(token, process.env.SECRET_WEB)
    if (!decodedToken) {
      return res.status(401).json({
        sucess: false,
        message: 'Unauthorized. Invalid or expired token'
      })
    }

    // Check if user id decoded from token is not found in database
    const user = await User.findByPk(decodedToken.userId)
    if (!user) {
      return res.status(401).json({
        sucess: false,
        message: 'Unauthorized. User not found'
      })
    }

    // Add user data to the request
    req.userId = decodedToken.userId
    req.userEmail = decodedToken.userEmail
    req.userRole = decodedToken.userRole

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
