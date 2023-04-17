/*
 * This file contains all the functions that will be used to handle the
 * authentication of the user.
*/
const User = require('../models')

const register = async (req, res) => {
  return res.json({ messsage: `This is the register from ${req.baseUrl}` })
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
