const express = require('express')
const router = express.Router()
const authController = require('../../controllers/authController')

// POST /auth/login
router.post('/login', authController.login)

// POST /auth/register
router.post('/register', authController.register)

// POST /auth/logout
router.post('/logout', authController.logout)

// POST /auth/refresh
router.post('/refresh', authController.refresh)

// POST /auth/forgot-password
router.post('/forgot-password', authController.forgotPassword)

// POST /auth/reset-password
router.post('/reset-password', authController.resetPassword)

// POST /auth/verify-email
router.post('/verify-email', authController.verifyEmail)

module.exports = router
