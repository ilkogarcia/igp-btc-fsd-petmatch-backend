/**
 * @file stateProvince.js
 * @description State and province routes
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
