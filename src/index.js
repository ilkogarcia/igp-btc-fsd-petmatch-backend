/**
 * @fileoverview Main entry point for the PetMatch API
 * @author @ilkogarcia
 * @version 1.0.0
 * @license MIT
 */

// Import dependencies and modules
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const routes = require('./v1/routes/index')
const dbConnect = require('./database/dbConnect')
const { swaggerDocs: v1SwaggerDocs } = require('./v1/swagger')

// Configure server
const server = express()
const PORT = process.env.PORT || 3000

// Configure CORS
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  optionsSuccessStatus: 200
}

// Middleware
server.use(cors(corsOptions))
server.use(express.json())
server.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ sucess: false, message: err.message })
  }
  next()
})

// Routes
server.use('/api/v1', routes)

dbConnect
  .then(() => {
    server.listen(PORT, () => {
      console.log(`🐶 PetMatch API is listening on port ${PORT}`)
      v1SwaggerDocs(server, PORT)
    })
  })
  .catch((error) => console.log(error.message))
