/*
* petController is a controller class responsible for processing
* HTTP request and return the response to the client in JSON format.
*/

import petService from '../services/petService.js'

export class petController {
  // CRUD: Create a new pet in database
  static createNewPet = (req, res) => {
    const createdPet = petService.createNewPet()
    return res.status(201).json({
      success: true,
      message: 'Create a new pet',
      data: createdPet
    })
  }

  // CRUD: Retrive an existing pet from database
  static getOnePet = (req, res) => {
    const pet = petService.getOnePet()
    return res.status(201).json({
      success: true,
      message: `Get an existing pet: ${req.params.petId}`,
      data: pet
    })
  }

  // CRUD: Update an existing pet in database
  static updateOnePet = (req, res) => {
    const updatedPet = petService.updateOnePet()
    return res.status(201).json({
      success: true,
      message: `Update an existing pet: ${req.params.petId}`,
      data: updatedPet
    })
  }

  // CRUD: Delete an existing pet in database
  static deleteOnePet = (req, res) => {
    const deletedPet = petService.deleteOnePet()
    return res.status(201).json({
      success: true,
      message: `Delete an existing pet: ${req.params.petId}`,
      data: deletedPet
    })
  }

  // Get all pets from database
  static getAllPets = (req, res) => {
    const allPets = petService.getAllPets()
    return res.status(201).json({
      success: true,
      message: 'Get all pets',
      data: allPets
    })
  }
}

export default petController
