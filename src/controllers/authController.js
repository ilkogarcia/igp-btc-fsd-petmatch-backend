/*
 * This file contains all the functions that will be used to handle the
 * authentication of the user.
*/
require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodeMailer = require('nodemailer')
const { User, AccountType } = require('../models/index')

/**
 * New user register in the application.
 * @param {Object} req - An object that includes a body element with data to create a new user in the database.
 * @returns {Object} res - An object in JSON format that includes all info from the recently created user.
*/
const register = async (req, res) => {
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

    // Get the account type of the user
    const accountType = await AccountType.findOne({ where: { title: 'user' } })
    
    // Create a user object to pass it as an argument to our service
    const newUser = {
      email,
      passwordHash,
      accountTypeId: accountType.id,
      isActive: false,
      isVerified: false
    }

    // Create the user in the database
    const user = await User.create(newUser)

    // Generate the token to verify the user email
    const token = jwt.sign(
      { id: user.id,
        email: user.email,
        accountTypeId: user.accountTypeId,
      }, process.env.JWT_SECRET, { expiresIn: '1d' })

    // Send the email to verify the user email
    // const transporter = nodeMailer.createTransport({
    //   service: 'gmail',
    //   auth: {
    //     user: process.env.EMAIL,
    //     pass: process.env.EMAIL_PASSWORD
    //   }
    // })

    // const mailOptions = {
    //   from: process.env.EMAIL,
    //   to: user.email,
    //   subject: 'Verify your email',
    //   html: `<p>Thank you for registering!</p><p>Please click <a href='${process.env.CLIENT_URL}/verify/${token}'>this link</a> to verify your email.</p>`,
    // }

    return res.status(201).json({
      sucess: true,
      message: 'Registration successful. Please verify your email.',
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

/*
 * User login in the application.
 * @param {Object} req - An object that includes a body element with data to login a user in the application. 
 * @returns {Object} res - An object in JSON format that includes all info from the recently created user
 * and a token to be used in the next requests.
*/
const login = async (req, res) => {
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

    // Generate the user token
    const token = jwt.sign(
      { id: user.id,
        email: user.email,
        accountTypeId: user.accountTypeId,
      }, process.env.JWT_SECRET, { expiresIn: '1d' })

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

const logout = async (req, res) => {
  return res.json({ messsage: `This is the logout from ${req.baseUrl}` })
}

const refresh = async (req, res) => {
  return res.json({ messsage: `This is the refresh from ${req.baseUrl}` })
}

const forgotPassword = async (req, res) => {
  return res.json({ messsage: `This is the forgotPassword from ${req.baseUrl}` })
}

const resetPassword = async (req, res) => {
  return res.json({ messsage: `This is the resetPassword from ${req.baseUrl}` })
}

const verifyEmail = async (req, res) => {
  return res.json({ messsage: `This is the verifyEmail from ${req.baseUrl}` })
}

module.exports = {
  register,
  login,
  logout,
  refresh,
  forgotPassword,
  resetPassword,
  verifyEmail
}
