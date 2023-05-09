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

// Import country controllers
const StateProvinceController = require('../../controllers/stateProvinceController')

// GET /api/v1/countries - Get all countries
router.get('/', StateProvinceController.getAllStateProvinces)

module.exports = router
