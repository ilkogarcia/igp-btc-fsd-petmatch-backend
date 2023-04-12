/*
* petService is a service class responsible for fetching data from database
*/

import * as dotenv from 'dotenv'
import { v4 as uuidv4 } from 'uuid'
import petDB from '../database/Pet.js'

dotenv.config()
const language = process.env.LANGUAGE || 'es-ES'

export class petService {
  // CRUD: Create a new pet in database
  static createNewPet = async (newPet) => {
    const petToInsert = {
      ...newPet,
      id: uuidv4(),
      createdAt: new Date().toLocaleString(language, { timeZone: 'UTC' }),
      updatedAt: new Date().toLocaleString(language, { timeZone: 'UTC' })
    }
    try {
      const createdPet = petDB.createNewPet(petToInsert)
      return createdPet
    } catch (error) {
      throw error
    }
  }

  // CRUD: Retrive an existing pet from database
  static getOnePet = (petId) => {
    const pet = petDB.getOnePet(petId)
    return pet
  }

  // CRUD: Update an existing pet in database
  static updateOnePet = (petId, changes) => {
    const updatedPet = petDB.updateOnePet(petId, changes)
    return updatedPet
  }

  // CRUD: Delete an existing pet in database
  static deleteOnePet = (petId) => {
    return petDB.deleteOnePet(petId)
  }

  // Get all pets from database
  static getAllPets = () => {
    const allPets = petDB.getAllPets()
    return allPets
  }
}

export default petService
