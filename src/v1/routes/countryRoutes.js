/**
 * @file countryRoutes.js
 * @description Country routes
 */

// Import express and create router
const express = require('express')
const router = express.Router()

// Import security middlewares
const isAuthenticated = require('../../middlewares/isAuthenticated')
const isAuthorized = require('../../middlewares/isAuthorized')

// Import country controllers
const CountryController = require('../../controllers/countryController')

// GET /api/v1/countries - Get all countries
router.get('/', isAuthenticated, isAuthorized, CountryController.getAllCountries)

module.exports = router
