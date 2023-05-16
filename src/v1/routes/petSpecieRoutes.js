/**
 * @module v1/routes/petSpecieRoutes
 * @description Pet specie routes.
 * @requires express
 * @requires v1/controllers/petSpecieController
 */

// Import express and create router
const express = require('express')
const router = express.Router()

// Import security middlewares
const isAuthenticated = require('../../middlewares/isAuthenticated')
const isAuthorized = require('../../middlewares/isAuthorized')

// Import country controllers
const PetSpecieController = require('../../controllers/petSpecieController')

// GET /v1/pet-species/:petSpecieId - Get one pet specie by his id
router.get('/:petSpecieId', PetSpecieController.getOnePetSpecie)

// POST /v1/pet-species/search - Get all pet species usign filters
router.post(
  '/search',
  isAuthenticated,
  isAuthorized,
  PetSpecieController.getAllPetSpecies
)

module.exports = router
