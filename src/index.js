import express from 'express'
import * as dotenv from 'dotenv'
import routes from './v1/routes/index.js'

const server = express()
dotenv.config()
const PORT = process.env.PORT || 3000

server.use(express.json())
server.use('/api/v1', routes)

server.listen(PORT, () => {
  console.log(`🐶 PetMatch API is listening on port ${PORT}`)
})
