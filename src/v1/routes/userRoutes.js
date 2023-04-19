/**
 * @file userRoutes.js
 * @description User routes
 */

// Import express and create router
const express = require('express')
const router = express.Router()

// Import middlewares
const isAuthenticated = require('../../middlewares/isAuthenticated')
const isAuthorized = require('../../middlewares/isAuthorized')

// Import controllers
const UserController = require('../../controllers/userController')
const { newUserPolicy, getUserPolicy, updateUserPolicy } = require('../../middlewares/userPolicies')

// POST /api/v1/users - Create a new user
router.post('/', isAuthenticated, isAuthorized, newUserPolicy, UserController.createNewUser)

// GET /api/v1/users/:userId - Get a user by id
router.get('/:userId', isAuthenticated, isAuthorized, getUserPolicy, UserController.getOneUser)

// PUT /api/v1/users/:userId - Update a user by id
router.put('/:userId', isAuthenticated, isAuthorized, updateUserPolicy, UserController.updateOneUser)

// DELETE /api/v1/users/:userId - Delete a user by id
router.delete('/:userId', isAuthenticated, isAuthorized, getUserPolicy, UserController.deleteOneUser)

// GET /api/v1/users - Get all users
router.get('/', isAuthenticated, isAuthorized, getUserPolicy, UserController.getAllUsers)

module.exports = router
