const express = require('express')
const router = express.Router()
const petRoutes = require('./petRoutes')

// Auth endpoints Routes
router.use('/auth', require('./authRoutes'))

// Pets endpoints Routes
router.use('/pets', petRoutes)

// API Welcome endpoint route
router.get('/', async (req, res) => {
  return res.json({ messsage: `👋 Hello from ${req.baseUrl}` })
})

module.exports = router
