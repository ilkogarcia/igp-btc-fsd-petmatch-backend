const express = require('express')
const router = express.Router()
const petRoutes = require('./petRoutes')
const userRoutes = require('./userRoutes')

// Auth endpoints routes
router.use('/auth', require('./authRoutes'))

// Users endpoints routes
router.use('/users', userRoutes)

// Pets endpoints routes
router.use('/pets', petRoutes)

// API Welcome endpoint route
router.get('/', async (req, res) => {
  return res.json({ messsage: `👋 Hello from ${req.baseUrl}` })
})

module.exports = router
