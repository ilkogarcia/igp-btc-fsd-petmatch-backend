const express = require('express')
const router = express.Router()
const petRoutes = require('./petRoutes')

// Pets endpoints Routes
router.use('/pets', petRoutes)

// API Welcome endpoint route
router.get('/', async (req, res) => {
  return res.json({ messsage: `👋 Hello from ${req.baseUrl}` })
})

module.exports = router
