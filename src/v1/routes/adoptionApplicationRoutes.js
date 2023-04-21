/**
 * @module routes/adoptionApplicationRoutes
 * @description Adoption Application routes.
 * @requires express
 * @requires controllers/adoptionApplicationController
 * @requires middlewares/isAuthenticated
 * @requires middlewares/isAuthorized
 */

// Import express and create router
const express = require('express')
const router = express.Router()

// Import security middlewares
const isAuthenticated = require('../../middlewares/isAuthenticated')
const isAuthorizedOnAdoption = require('../../middlewares/isAuthorizedOnAdoption')

// Import adoption application controllers
const AdoptionApplicationController = require('../../controllers/adoptionApplicationController')

// POST /api/v1/adoptions/ - Create a new adoption application
router.post('/', isAuthenticated, isAuthorizedOnAdoption, AdoptionApplicationController.createNewAdoptionApplication)

// GET /api/v1/adoptions/:adoptionId - Get one adoption application by id
router.get('/:adoptionId', isAuthenticated, isAuthorizedOnAdoption, AdoptionApplicationController.getOneAdoptionApplication)

// PUT /api/v1/adoptions/:adoptionId - Update one adoption application by id
router.put('/:adoptionId', isAuthenticated, isAuthorizedOnAdoption, AdoptionApplicationController.updateOneAdoptionApplication)

// DELETE /api/v1/adoptions/:adoptionId - Delete one adoption application by id
router.delete('/:adoptionId', isAuthenticated, isAuthorizedOnAdoption, AdoptionApplicationController.deleteOneAdoptionApplication)

// GET /api/v1/adoptions/ - Get all adoption applications
router.get('/', isAuthenticated, isAuthorizedOnAdoption, AdoptionApplicationController.getAllAdoptionApplications)

module.exports = router
