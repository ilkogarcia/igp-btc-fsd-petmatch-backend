import express from 'express'
import petRoutes from './petRoutes.js'

const router = express.Router()

// Pets endpoints Routes
router.use('/pets', petRoutes)

// API Welcome endpoint route
router.get('/', async (req, res) => {
  return res.json({ messsage: `👋 Hello from ${req.baseUrl}` })
})

export default router
