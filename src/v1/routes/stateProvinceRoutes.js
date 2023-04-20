/**
 * @module v1/routes/stateProvinceRoutes
 * @description StateProvince routes
 * @requires express
 * @requires v1/middlewares/isAuthenticated
 * @requires v1/middlewares/isAuthorized
 * @requires v1/controllers/stateProvinceController
 */

// Import express and create router
const express = require('express')
const router = express.Router()

// Import security middlewares
const isAuthenticated = require('../../middlewares/isAuthenticated')
const isAuthorized = require('../../middlewares/isAuthorized')

// Import country controllers
const StateProvinceController = require('../../controllers/stateProvinceController')

// GET /api/v1/countries - Get all countries
router.get('/', isAuthenticated, isAuthorized, StateProvinceController.getAllStateProvinces)

module.exports = router
