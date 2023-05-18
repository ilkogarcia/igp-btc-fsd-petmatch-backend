/**
 * @module routes/shelterRoutes
 * @description Shelter routes.
 * @requires express
 * @requires controllers/shelterController
 * @requires middlewares/isAuthenticated
 * @requires middlewares/isAuthorized
 * @requires middlewares/shelterPolicy
 */

// Import express and create router
const express = require('express')
const router = express.Router()

// Import security middlewares
const isAuthenticated = require('../../middlewares/isAuthenticated')
const isAuthorizedOnShelter = require('../../middlewares/isAuthorizedOnShelter')
const ShelterPolicy = require('../../middlewares/shelterPolicies')

// Import shelter controllers
const ShelterController = require('../../controllers/shelterController')

// POST /api/v1/shelters/ - CRUD: Create a new shelter
router.post(
  '/',
  isAuthenticated,
  isAuthorizedOnShelter,
  ShelterPolicy.newShelterPolicy,
  ShelterController.createNewShelter
)

// GET /api/v1/shelters/:shelterId - CRUD: Read one shelter by id
router.get(
  '/:shelterId',
  isAuthenticated,
  isAuthorizedOnShelter,
  ShelterPolicy.getShelterPolicy,
  ShelterController.getOneShelter
)

// PUT /api/v1/shelters/:shelterId - CRUD: Update one shelter by id
router.put(
  '/:shelterId',
  isAuthenticated,
  isAuthorizedOnShelter,
  ShelterPolicy.updateShelterPolicy,
  ShelterController.updateOneShelter
)

// DELETE /api/v1/shelters/:shelterId - CRUD: Delete one shelter by id
router.delete(
  '/:shelterId',
  isAuthenticated,
  isAuthorizedOnShelter,
  ShelterPolicy.deleteShelterPolicy,
  ShelterController.deleteOneShelter
)

// POST /api/v1/shelters/search - CRUD: Read all shelters
router.post(
  '/search',
  isAuthenticated,
  isAuthorizedOnShelter,
  ShelterPolicy.getAllSheltersPolicy,
  ShelterController.getAllShelters
)

module.exports = router
