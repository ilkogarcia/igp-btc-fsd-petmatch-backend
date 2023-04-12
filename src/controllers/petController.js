/*
* petController is a controller class responsible for processing
* HTTP request and return the response to the client in JSON format.
*/

import petService from '../services/petService.js'

export class petController {
  // CRUD: Create a new pet in database
  static createNewPet = (req, res) => {
    const { body } = req
    // Validate required properties not missing in the body
    if (
      !body.name ||
      !body.species ||
      !body.breed ||
      !body.age ||
      !body.gender ||
      !body.shelter_id ||
      !body.status
    ) {
      return res.status(400).json({
        success: false,
        message: 'One of the mandatory fields are missing or empty in your request.'
      })
    }
    // Create a newPet object to pass it as an argument to our pet service
    const newPet = {
      name: body.name,
      species: body.species,
      breed: body.breed,
      age: body.age,
      gender: body.gender,
      shelter_id: body.shelter_id,
      status: body.status
    }
    // Pass newPet to pet service in order to create it on the database
    const createdPet = petService.createNewPet(newPet)
    return res.status(201).json({
      success: true,
      message: 'Successfully added the new pet to the database.',
      data: createdPet
    })
  }

  // CRUD: Retrive an existing pet from database
  static getOnePet = (req, res) => {
    const petId = req.params.petId
    if (!petId) {
      return res.status(400).json({
        success: false,
        message: `Pet ID ${petId} parameter are missing in your request.`
      })
    }
    const pet = petService.getOnePet(petId)
    if (!pet) {
      return res.status(400).json({
        success: false,
        message: `Pet ID ${petId} not find.`
      })
    }
    return res.status(201).json({
      success: true,
      message: `Existing pet: ${petId}`,
      data: pet
    })
  }

  // CRUD: Update an existing pet in database
  static updateOnePet = (req, res) => {
    const { petId } = req.params
    const { body } = req
    if (!petId) {
      return res.status(400).json({
        success: false,
        message: `Pet ID ${petId} parameter are missing in your request.`
      })
    }
    // Create a newPet object to pass it as an argument to our pet service
    const changes = {
      name: body.name,
      species: body.species,
      breed: body.breed,
      age: body.age,
      gender: body.gender,
      shelter_id: body.shelter_id,
      status: body.status
    }
    const updatedPet = petService.updateOnePet(petId, changes)
    if (!updatedPet) {
      return res.status(400).json({
        success: false,
        message: `Pet ID ${petId} not find.`
      })
    }
    return res.status(201).json({
      success: true,
      message: `Pet with ID:${petId} updated successfully`,
      data: updatedPet
    })
  }

  // CRUD: Delete an existing pet in database
  static deleteOnePet = (req, res) => {
    const petId = req.params.petId
    if (!petId) {
      return res.status(400).json({
        success: false,
        message: `Pet ID ${petId} parameter are missing in your request.`
      })
    }
    const deletedPet = petService.deleteOnePet(petId)
    if (!deletedPet) {
      return res.status(400).json({
        success: false,
        message: `Not deleted. Pet ID ${petId} not find.`
      })
    }
    return res.status(201).json({
      success: true,
      message: `Pet with ID:${petId} deleted successfully`,
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
