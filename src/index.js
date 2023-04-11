import express from 'express'
import * as dotenv from 'dotenv'

const app = express()
const PORT = process.env.PORT || 3000

// For testing purpose
app.get("/", (req, res) => {
 res.send('<h2>Welcome to PetMatch API... It´s Working!</h2>')
})

app.listen(PORT, () => {
    console.log(`PetMatch API is listening on port ${PORT}`)
})
