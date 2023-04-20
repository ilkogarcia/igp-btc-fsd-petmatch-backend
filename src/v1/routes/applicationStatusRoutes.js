/**
 * @module v1/routes/applicationStatusRoutes
 * @description Application status routes.
 * @requires express
 * @requires v1/middlewares/isAuthenticated
 * @requires v1/middlewares/isAuthorized
 * @requires v1/controllers/applicationStatusController
 */

// Import express and create router
const express = require('express')
const router = express.Router()

// Import security middlewares
const isAuthenticated = require('../../middlewares/isAuthenticated')
const isAuthorized = require('../../middlewares/isAuthorized')

// Import country controllers
const ApplicationStatusController = require('../../controllers/applicationStatusController')

// GET /v1/application-statuses/:applicationStatusId - Get one application status by his id
router.get('/:applicationStatusId', isAuthenticated, isAuthorized, ApplicationStatusController.getOneApplicationStatus)

// GET /v1/application-statuses - Get all application statuses
router.get('/', isAuthenticated, isAuthorized, ApplicationStatusController.getAllApplicationStatuses)

module.exports = router
