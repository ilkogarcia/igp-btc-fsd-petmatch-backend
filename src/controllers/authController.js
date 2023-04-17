/*
 * This file contains all the functions that will be used to handle the
 * authentication of the user.
*/
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodeMailer = require('nodemailer')
const { User, AccountType } = require('../models/index')

/**
 * 
 * @param {Object} req - An object that includes a body element with data to create a new user in the database.
 * @returns {Object} res - An object in JSON format that includes all info from the recently created user.
 */
const register = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({
      sucess: false,
      message: 'Email and password are required'
    })
  }

  try {
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
    return res.status(201).json({
      sucess: true,
      message: 'User created successfully',
      data: user
    })

  } catch (error) {
    return res.status(500).json({
      sucess: false,
      message: error?.message || 'Internal server error',
      data: error
    })
  }
}

const login = async (req, res) => {
  return res.json({ messsage: `This is the login from ${req.baseUrl}` })
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
