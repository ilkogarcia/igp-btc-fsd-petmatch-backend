const express = require('express')
const router = express.Router()
const authController = require('../../controllers/authController')

// POST /auth/login
router.post('/login', authController.loginUser)

// POST /auth/register
router.post('/register', authController.registerUser)

// POST /auth/logout
router.post('/logout', authController.logoutUser)

// POST /auth/refresh
router.post('/refresh', authController.refreshToken)

// POST /auth/forgot-password
router.post('/forgot-password', authController.forgotPassword)

// POST /auth/reset-password
router.post('/reset-password', authController.resetPassword)

// POST /auth/verify-email
router.post('/verify-email', authController.verifyEmail)

module.exports = router
