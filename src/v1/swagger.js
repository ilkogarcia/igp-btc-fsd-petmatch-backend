const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

// Basic Meta Informations about our API
const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'PetMatch API',
      version: '1.0.0'
    }
  },
  apis: ['./src/v1/routes/petRoutes.js', './src/database/Pet.js']
}

// Docs in JSON format
const swaggerSpec = swaggerJSDoc(options)

// Function to setup our docs
const swaggerDocs = (app, port) => {
  // Route-Handler to visit our docs
  app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  // Make our docs in JSON format available
  app.get('/api/v1/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  })
  console.log(
    'API v1.0.0 Docs are available on /api/v1/docs'
  )
}

module.exports = { swaggerDocs }
