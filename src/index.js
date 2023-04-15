/*
 * PetMatch.es
 * Main App
*/

require('dotenv').config()
const express = require('express')
const routes = require('./v1/routes/index')
const dbConnect = require('./database/dbConnect')
const { swaggerDocs: v1SwaggerDocs } = require('./v1/swagger')

const server = express()
const PORT = process.env.PORT || 3000

server.use(express.json())
server.use('/api/v1', routes)

dbConnect
  .then(() => {
    server.listen(PORT, () => {
      console.log(`🐶 PetMatch API is listening on port ${PORT}`)
      v1SwaggerDocs(server, PORT)
    })
  })
  .catch((error) => console.log(error.message))
