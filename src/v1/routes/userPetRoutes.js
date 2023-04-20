/**
 * @module v1/routes/userPetRoutes
 * @description User-Pet routes.
 * @requires express
 * @requires v1/middlewares/isAuthenticated
 * @requires v1/middlewares/isAuthorized
 * @requires v1/controllers/userPetController
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

// GET /api/v1/user-pets/likes - Get the pets list the user logged in has a liked
router.get('/likes', isAuthenticated, isAuthorized, UserPetController.getAllPetsLikes)

// GET /api/v1/user-pets/saved - Get the pets list the user logged in has a saved
router.get('/saved', isAuthenticated, isAuthorized, UserPetController.getAllPetsSaved)

// GET /api/v1/user-pets/favorites - Get the pets list the user logged in has a favorited
router.get('/favorites', isAuthenticated, isAuthorized, UserPetController.getAllPetsFavorites)

module.exports = router
