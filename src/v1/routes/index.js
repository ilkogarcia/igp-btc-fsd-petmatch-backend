/**
 * @file index.js
 * @description API v1 routes
 */

// Import express and create router
const express = require('express')
const router = express.Router()

// Auth endpoints routes
router.use('/auth', require('./authRoutes'))

// Users endpoints routes
router.use('/users', require('./userRoutes'))

// Pets endpoints routes
router.use('/pets', require('./petRoutes'))

// Countries endpoints routes
router.use('/countries', require('./countryRoutes'))

// State and province endpoints routes
router.use('/state-provinces', require('./stateProvinceRoutes'))

// City endpoints routes
router.use('/cities', require('./cityRoutes'))

// API Welcome endpoint route
router.get('/', async (req, res) => {
  return res.json({ messsage: `👋 Hello from ${req.baseUrl}` })
})

module.exports = router
