/**
 * @module v1/routes/petBreedRoutes
 * @description Pet breed routes
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

// Import country controllers
const PetBreedController = require('../../controllers/petBreedController')

// GET /api/v1/pet-breeds/:petBreedId - Get one pet breed by his id
router.get('/:petBreedId', isAuthenticated, isAuthorized, PetBreedController.getOnePetBreed)

// GET /api/v1/pet-breeds - Get all pet breeds
router.get('/', isAuthenticated, isAuthorized, PetBreedController.getAllPetBreeds)

module.exports = router
