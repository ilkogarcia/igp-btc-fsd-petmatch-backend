/**
 * @module v1/routes/petStatusRoutes
 * @description Pet status routes.
 * @requires express
 * @requires v1/controllers/petStatusController
 */

// Import express and create router
const express = require('express')
const router = express.Router()

// Import country controllers
const PetStatusController = require('../../controllers/petStatusController')

// GET /v1/pet-statuses/:petStatusId - Get one pet status by his id
router.get('/:petStatusId', PetStatusController.getOnePetStatus)

// GET /v1/pet-statuses - Get all pet statuses
router.get('/', PetStatusController.getAllPetStatuses)

module.exports = router
