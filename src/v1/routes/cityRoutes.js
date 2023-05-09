/**
 * @file cityRoutes.js
 * @description Cities routes
 */

// Import express and create router
const express = require('express')
const router = express.Router()

// Import city controllers
const CityController = require('../../controllers/cityController')

// GET /api/v1/countries - Get all countries
router.get('/', CityController.getAllCities)

module.exports = router
