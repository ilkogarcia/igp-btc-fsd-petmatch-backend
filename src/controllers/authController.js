/*
 * This file contains all the functions that will be used to handle the
 * authentication of the user.
*/
require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { addToBlacklist } = require('../helpers/auth')
const { sendEmail } = require('../services/emailService')
const { getOneAccountType, findAccountTypeByTitle } = require('../services/accountTypeService')
const { User } = require('../models')

/**
 * New user register in the application.
 * 
 * @param {Object} req - An object that includes a body element with data to create a new user in the database.
 * @returns {Object} res - An object in JSON format that includes all info from the recently created user.
*/

const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body

    // Check if the email and password are provided
    if (!email || !password) {
      return res.status(400).json({
        sucess: false,
        message: 'Email and password are required'
      })
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } })
    if (existingUser) {
      return res.status(409).json({
        sucess: false,
        message: 'Email already exists'
      })
    }
    
    // Generate the hash of the password
    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)

    // Get the id defined for users account type
    const accountType = await findAccountTypeByTitle('user')
    if (!accountType) {
      return res.status(500).json({
        sucess: false,
        message: 'Internal server error'
      })
    }
    
    // Create a user object to pass it as an argument to our service
    const newUser = {
      email,
      passwordHash,
      accountTypeId: accountType.id,
      isActive: true,
      isVerified: false
    }

    // Create the user in the database
    const user = await User.create(newUser)

    // Generate the token to verify the user email
    const token = jwt.sign(
      { userId: user.id,
        userEmail: user.email,
        userRole: accountType.title || 'user',
      }, process.env.SECRET_EMAIL, { expiresIn: '1h' })

    // Create a verification URL using the generated token. URL will point
    // to API route that handle email verification
    const verificationURL = `${process.env.API_URL}/auth/verify-email?token=${token}`;

    // Format the email content and include the verification URL
    const emailMsg = `
      <p>Dear User,</p>
      <p>Thank you for registering on our platform. Please verify your email address by clicking the link below:</p>
      <p><a href='${verificationURL}'>Verify my email address</a></p>
      <p>If you did not request this, please ignore this email.</p>
      <p>Best regards,</p>
      <p>PetMatch.es Platform Team</p>`
    
    // Send the verification email
    await sendEmail(email, 'Verify your email address', emailMsg)

    return res.status(201).json({
      sucess: true,
      message: 'Registration successful. Please verify your email.',
      // data: {
      //   token: token
      // }
    })

  } catch (error) {
    return res.status(500).json({
      sucess: false,
      message: error?.message || 'Internal server error',
      data: error
    })
  }
}

/**
 * Route that handle the email verification request. Should match the
 * URL path defined in the verification URL by the registerUser function.
 * 
 * @param {Object} req - An object that includes a query element with the token to verify the user email.
 * @returns {Object} res - An object in JSON format that includes a message.
 */

const verifyEmail = async (req, res) => {
  const { token } = req.query
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_EMAIL)
    const decodedEmail = decodedToken.userEmail
    
    // Search for the user to be updated on the database
    const user = await User.findOne({ where: { email: decodedEmail } })
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired email verification token.'
      })
    }

    // Update the user email verification status
    const updatedUser = await User.update({ isVerified: true }, { where: { email: decodedEmail } })
    if (!updatedUser) {
      return res.status(400).json({
        success: false,
        message: 'An error occurred during email verification process.'
      })
    }

    return res.status(201).json({
      sucess: true,
      message: 'Your email has been successfully verified.'
    })

  } catch (error) {
    return res.status(500).json({
      sucess: false,
      message: error?.message || 'Unknown error. Please try again later.',
      data: error
    })
  }
}

/**
 * User login in the application.
 * 
 * @param {Object} req - An object that includes a body element with data to login a user in the application. 
 * @returns {Object} res - An object in JSON format that includes all info from the recently created user
 * and a token to be used in the next requests.
*/

const loginUser = async (req, res) => {
  const { email, password } = req.body  

  try {
    // Check if the user exists
    const user = await User.findOne({ where: { email } })
    if (!user) {
      return res.status(401).json({
        sucess: false,
        message: 'Invalid credentials'
      })
    }
    
    // Check if user account is active
    if (!user.isActive) {
      return res.status(401).json({
        sucess: false,
        message: 'User account is not active'
      })
    }

    // Check if user email is verified
    if (!user.isVerified) {
      return res.status(401).json({
        sucess: false,
        message: 'User email is not verified'
      })
    }

    // Check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash)
    if (!isPasswordCorrect) {
      return res.status(401).json({
        sucess: false,
        message: 'Invalid credentials'
      })
    }

    // Get the id defined for users account type
    const accountType = await getOneAccountType(user.accountTypeId)

    // Generate the user token
    const token = jwt.sign(
      { userId: user.id,
        userEmail: user.email,
        userRole: accountType.title,
      }, process.env.SECRET_WEB, { expiresIn: '1h' })

    return res.status(201).json({
      sucess: true,
      message: 'User logged in successfully',
      data: {
        token: token
      }
    })

  } catch (error) {
    return res.status(500).json({
      sucess: false,
      message: error?.message || 'Internal server error',
      data: error
    })
  }
}

/**
 *  Logout endpoint that the client can use to invalidate the JWT token.
 * 
 * @param {Object} req - An object that includes user token.
 * @returns {Object} res - An object in JSON format that includes a message. 
*/

const logoutUser = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1]  
    // add the token to the blacklist
    addToBlacklist(token)
    // respond to the client with a success message
    return res.status(200).json({
      sucess: true,
      message: 'User logged out successfully'
    })
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      message: error?.message || 'Internal server error',
      data: error
    })
  }
}

const refreshToken = async (req, res) => {
  return res.json({ messsage: `This is the refresh from ${req.baseUrl}` })
}

const forgotPassword = async (req, res) => {
  return res.json({ messsage: `This is the forgotPassword from ${req.baseUrl}` })
}

const resetPassword = async (req, res) => {
  return res.json({ messsage: `This is the resetPassword from ${req.baseUrl}` })
}


module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  refreshToken,
  forgotPassword,
  resetPassword,
  verifyEmail
}
