/**
 * @file userRoutes.js
 * @description User routes
 */

// Import express and create router
const express = require('express')
const router = express.Router()

// Import middlewares
const isAuthenticated = require('../../middlewares/isAuthenticated')
const isAuthorizedOnUser = require('../../middlewares/isAuthorizedOnUser')

// Import controllers
const UserController = require('../../controllers/userController')
const UserPolicies = require('../../middlewares/userPolicies')

// POST /api/v1/users - Create a new user
router.post('/', isAuthenticated, isAuthorizedOnUser, UserPolicies.newUserPolicy, UserController.createNewUser)

// GET /api/v1/users/:userId - Get a user by id
router.get('/:userId', isAuthenticated, isAuthorizedOnUser, UserPolicies.getUserPolicy, UserController.getOneUser)

// PUT /api/v1/users/:userId - Update a user by id
router.put('/:userId', isAuthenticated, isAuthorizedOnUser, UserPolicies.updateUserPolicy, UserController.updateOneUser)

// DELETE /api/v1/users/:userId - Delete a user by id
router.delete('/:userId', isAuthenticated, isAuthorizedOnUser, UserPolicies.deleteUserPolicy, UserController.deleteOneUser)

// GET /api/v1/users - Get all users
router.get('/', isAuthenticated, isAuthorizedOnUser, UserPolicies.getAllUsersPolicy, UserController.getAllUsers)

module.exports = router
