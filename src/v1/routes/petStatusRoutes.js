/**
 * @module v1/routes/petStatusRoutes
 * @description Pet status routes.
 * @requires express
 * @requires v1/middlewares/isAuthenticated
 * @requires v1/middlewares/isAuthorized
 * @requires v1/controllers/petStatusController
 */

// Import express and create router
const express = require('express')
const router = express.Router()

// Import security middlewares
const isAuthenticated = require('../../middlewares/isAuthenticated')
const isAuthorized = require('../../middlewares/isAuthorized')

// Import country controllers
const PetStatusController = require('../../controllers/petStatusController')

// GET /v1/pet-statuses/:petStatusId - Get one pet status by his id
router.get('/:petStatusId', isAuthenticated, isAuthorized, PetStatusController.getOnePetStatus)

// GET /v1/pet-statuses - Get all pet statuses
router.get('/', isAuthenticated, isAuthorized, PetStatusController.getAllPetStatuses)

module.exports = router
