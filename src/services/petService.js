/*
* petService is a service class responsible for fetching data from database
*/

import petDB from '../database/Pet.js'

export class petService {
  // CRUD: Create a new pet in database
  static createNewPet = () => {
    return 'NewPet'
  }

  // CRUD: Retrive an existing pet from database
  static getOnePet = () => {
    return 'OnePet'
  }

  // CRUD: Update an existing pet in database
  static updateOnePet = () => {
    return 'OnePet Updated'
  }

  // CRUD: Delete an existing pet in database
  static deleteOnePet = () => {
    return 'OnePet Deleted'
  }

  // Get all pets from database
  static getAllPets = () => {
    const allPets = petDB.getAllPets()
    return allPets
  }
}

export default petService
