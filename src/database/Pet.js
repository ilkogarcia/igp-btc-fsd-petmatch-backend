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

  static getAllPets = () => {
    return DB.pets
  }
}

export default petDB
