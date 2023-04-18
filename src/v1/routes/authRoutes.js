const express = require('express')
const router = express.Router()
const authController = require('../../controllers/authController')
const isAuthenticated = require('../../middlewares/isAuthenticated')

// POST /auth/register
router.post('/register', authController.registerUser)

// POST /auth/login
router.post('/login', authController.loginUser)

// GET /auth/verify-email
router.get('/verify-email', authController.verifyEmail)

// POST /auth/refresh
router.post('/refresh', authController.refreshToken)

// POST /auth/forgot-password
router.post('/forgot-password', authController.forgotPassword)

// POST /auth/reset-password
router.post('/reset-password', authController.resetPassword)

// POST /auth/logout
router.post('/logout', isAuthenticated ,authController.logoutUser)

module.exports = router
