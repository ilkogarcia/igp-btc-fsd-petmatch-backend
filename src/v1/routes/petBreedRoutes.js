/**
 * @module v1/routes/petBreedRoutes
 * @description Pet breed routes
 * @requires express
 * @requires v1/controllers/petBreedController
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
router.get('/:petBreedId', PetBreedController.getOnePetBreed)

// POST /api/v1/pet-breeds/search - Get all pet breeds usign filters
router.post(
  '/search',
  isAuthenticated,
  isAuthorized,
  PetBreedController.getAllPetBreeds
)

module.exports = router
