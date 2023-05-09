/**
 * @file countryRoutes.js
 * @description Country routes
 */

// Import express and create router
const express = require('express')
const router = express.Router()

// Import country controllers
const CountryController = require('../../controllers/countryController')

// GET /api/v1/countries - Get all countries
router.get('/', CountryController.getAllCountries)

module.exports = router
