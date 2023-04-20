/**
 * @module v1/routes
 * @description API v1 routes
 * @requires express
 * @requires v1/routes/authRoutes
 * @requires v1/routes/userRoutes
 * @requires v1/routes/countryRoutes
 * @requires v1/routes/stateProvinceRoutes
 * @requires v1/routes/cityRoutes
 * @requires v1/routes/petRoutes
 * @requires v1/routes/petBreedRoutes
 * @requires v1/routes/petSpecieRoutes
 */

// Import express and create router
const express = require('express')
const router = express.Router()

// Auth endpoints routes
router.use('/auth', require('./authRoutes'))

// Users endpoints routes
router.use('/users', require('./userRoutes'))

// Countries endpoints routes
router.use('/countries', require('./countryRoutes'))

// State and province endpoints routes
router.use('/state-provinces', require('./stateProvinceRoutes'))

// City endpoints routes
router.use('/cities', require('./cityRoutes'))

// Pets endpoints routes
router.use('/pets', require('./petRoutes'))

// Pet breeds endpoints routes
router.use('/pet-breeds', require('./petBreedRoutes'))

// Pet species endpoints routes
router.use('/pet-species', require('./petSpecieRoutes'))

// Pet statuses endpoints routes
router.use('/pet-statuses', require('./petStatusRoutes'))

// Application statuses endpoints routes
router.use('/application-statuses', require('./applicationStatusRoutes'))

// API Welcome endpoint route
router.get('/', async (req, res) => {
  return res.json({ messsage: `👋 Hello from ${req.baseUrl}` })
})

module.exports = router
