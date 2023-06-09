/**
 * @file authRoutes.js
 * @description Authentication routes
 */

// Import express and create router
const express = require('express')
const router = express.Router()

// Import middlewares
const isAuthenticated = require('../../middlewares/isAuthenticated')
const AuthPolicies = require('../../middlewares/authPolicies')

// Import controllers
const authController = require('../../controllers/authController')

// POST /auth/register - register user and send email verification
router.post('/register', AuthPolicies.registerPolicy, authController.registerUser)

// POST /auth/login - login user and return token
router.post('/login', AuthPolicies.loginPolicy, authController.loginUser)

// GET /auth/verify-email - verify user email with token
router.get('/verify-email', authController.verifyEmail)

// POST /auth/forgot-password - send email with reset password link
router.post('/forgot-password', AuthPolicies.forgotPasswordPolicy, authController.forgotPassword)

// POST /auth/reset-password - reset user password with token
router.post('/reset-password', authController.resetPassword)

// POST /auth/refresh - refresh user token to keep user logged in
router.post('/refresh', authController.refreshToken)

// POST /auth/logout (requires authentication) - logout user and invalidate token
router.post('/logout', isAuthenticated, authController.logoutUser)

module.exports = router
