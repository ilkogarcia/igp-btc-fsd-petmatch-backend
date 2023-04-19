/**
 * @file cityRoutes.js
 * @description Cities routes
 */

// Import express and create router
const express = require('express')
const router = express.Router()

// Import security middlewares
const isAuthenticated = require('../../middlewares/isAuthenticated')
const isAuthorized = require('../../middlewares/isAuthorized')

// Import city controllers
const CityController = require('../../controllers/cityController')

// GET /api/v1/countries - Get all countries
router.get('/', isAuthenticated, isAuthorized, CityController.getAllCities)

module.exports = router
