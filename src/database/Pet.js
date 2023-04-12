/*
* Database handle
*/

import * as dotenv from 'dotenv'
import { DB } from './db.js'
import { saveToDatabase } from './utils.js'

dotenv.config()
const language = process.env.LANGUAGE || 'es-ES'

export class petDB {
  static createNewPet = (newPet) => {
    const isAlreadyAdded = DB.pets.findIndex((pet) => pet.name === newPet.name) > -1
    if (isAlreadyAdded) {
      throw new Error({
        success: false,
        message: `Pet with the name '${newPet.name}' already exists`
      })
    }
    DB.pets.push(newPet)
    saveToDatabase(DB.pets)
    return newPet
  }

  static getOnePet = (petId) => {
    const pet = DB.pets.find((pet) => pet.id === petId)
    if (!pet) {
      return
    }
    return pet
  }

  static updateOnePet = (petId, changes) => {
    const indexForUpdate = DB.pets.findIndex(
      (pet) => pet.id === petId
    )
    if (!indexForUpdate === -1) {
      return
    }
    const updatedPet = {
      ...DB.pets[indexForUpdate],
      ...changes,
      updatedAt: new Date().toLocaleString(language, { timeZone: 'UTC' })
    }
    DB.pets[indexForUpdate] = updatedPet
    saveToDatabase(DB)
    return updatedPet
  }

  static deleteOnePet = (petId) => {
    const indexForDeletion = DB.pets.findIndex(
      (pet) => pet.id === petId
    )
    if (indexForDeletion === -1) {
      return false
    }
    DB.pets.splice(indexForDeletion, 1)
    saveToDatabase(DB)
    return true
  }

  static getAllPets = (filterParams) => {
    try {
      if (!DB || !DB.pets) {
        throw new Error({ status: 500, message: 'Database connection error.' })
      }
      const pets = DB.pets
      if (filterParams?.species) {
        const filteredPets = pets.filter((pet) => {
          return pet.species.toLowerCase().includes(filterParams.species.toLowerCase())
        })
        return filteredPets
      }
      // Other if-statements will go here for different parameters
      return pets
    } catch (error) {
      throw new Error({ status: 500, message: error.message })
    }
  }
}

/*
-------------------------------------------------
  Swagger API Doc. Schemas for return value.
  Comments in codebase also are a great documentation
  for developers.
-------------------------------------------------
*/

/**
  * @openapi
  * components:
  *   schemas:
  *     Pet:
  *       type: object
  *       properties:
  *         id:
  *           type: string
  *           example: 61dbae02-c147-4e28-863c-db7bd402b2d6
  *         name:
  *           type: string
  *           example: Firuly
  *         species:
  *           type: string
  *           example: Dog
  *         breed:
  *           type: string
  *           example: Golden Retriever
  *         age:
  *           type: integer
  *           example: 6
  *         gender:
  *           type: string
  *           example: Male
  *         description:
  *           type: string
  *           example: Goldens are outgoing, trustworthy, and eager-to-please family dogs, and relatively easy to train. They take a joyous and playful approach to life and maintain this puppyish behavior into adulthood. These energetic, powerful gundogs enjoy outdoor play.
  *         image_url:
  *           type: string
  *           example: https://httpstatusdogs.com/img/201.jpg
  *         shelter_id:
  *           type: string
  *           example: 4a3d9aaa-608c-49a7-a004-66305ad4ab50
  *         status:
  *           type: string
  *           example: Available for adoption
  *         createdAt:
  *           type: string
  *           example: 4/20/2022, 2:21:56 PM
  *         updatedAt:
  *           type: string
  *           example: 4/20/2022, 2:21:56 PM
*/

export default petDB
