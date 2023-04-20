/**
 * @module v1/routes/userPetRoutes
 * @description User-Pet routes.
 * @requires express
 * @requires v1/middlewares/isAuthenticated
 * @requires v1/middlewares/isAuthorized
 */

// Import express and create router
const express = require('express')
const router = express.Router()

// Import security middlewares
const isAuthenticated = require('../../middlewares/isAuthenticated')
const isAuthorized = require('../../middlewares/isAuthorized')

// Import user-pet controllers
const UserPetController = require('../../controllers/userPetController')

// GET /v1/user-pets/ - Get all user-pets
router.get('/', isAuthenticated, isAuthorized, UserPetController.getAllUserPets)

module.exports = router