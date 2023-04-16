/*
 * Controller class responsible for processing HTTP request
 * and return the response to the client in JSON format.
*/
const PetService = require('../services/petService')

/**
 * CRUD: Create a new pet in database.
 * @param {Object} req - An object that includes a body element with data to create a new pet in the database.
 * @returns {Object} res - An object in JSON format that includes all info from the recently created pet.
 */
const createNewPet = async (req, res) => {
  const { body } = req
  // Validate required properties not missing in the body
  if (
    !body.name ||
    !body.specieId ||
    !body.breedId ||
    !body.shelterId ||
    !body.statusId
  ) {
    return res.status(400).json({
      success: false,
      message: 'One of the mandatory fields are missing or empty in your request.'
    })
  }
  // Create a newPet object to pass it as an argument to our pet service
  try {
    const newPet = {
      specieId: body.specieId,
      breedId: body.breedId,
      shelterId: body.shelterId,
      statusId: body.statusId,
      gender: body.gender,
      name: body.name,
      age: body.age,
      description: body.description,
      imageUrl: body.imageUrl,
      vaccinationStatus: body.vaccinationStatus,
      spayedNeutered: body.spayedNeutered,
    }
    // Pass newPet to pet service in order to create it on the database
    const createdPet = await PetService.createNewPet(newPet)
    return res.status(201).json({
      sucess: true,
      message: 'Successfully added the new pet to the database.',
      info: {
        count: 1,
      },
      data: {
        pet: createdPet
      }
    })
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      message: error.message,
    })
  }
}

/**
 * CRUD: Get an existing pet from the database.
 * @param {Object} req - An object that includes as a parameter the pet Id to be deleted.
 * @returns {Object} res - An object in JSON format that includes the retrieved pet info.
 */
const getOnePet = async (req, res) => {
  const petId = req.params.petId
  try {
    const pet = await PetService.getOnePet(petId)
    if (!pet) {
      return res.status(404).json({
        success: false,
        message: `Pet ID ${petId} not find.`
      })
    }
    return res.status(201).json({
      sucess: true,
      message: 'Pet info recovered successfully!',
      info: {
        count: 1,
      },
      data: {
        pet: pet
      }
    })
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      message: error.message,
    })
  }
}

/**
 * CRUD: Update an existing pet in database by his Id.
 * @param {Object} req - An object that includes as a parameter the pet Id to be deleted.
 * @returns {Object} res - An object in JSON format that includes the updated pet info.
 */
const updateOnePet = async (req, res) => {
  const { petId } = req.params
  const { body } = req
  if (!petId) {
    return res.status(400).json({
      success: false,
      message: `Pet ID ${petId} parameter are missing in your request.`
    })
  }
  // Create a newPet object to pass it as an argument to our pet service
  try {
    const updatedPet = await PetService.updateOnePet(petId, body)
    if (!updatedPet) {
      return res.status(404).json({
        success: false,
        message: `Pet ID ${petId} not find.`
      })
    }
    return res.status(201).json({
      sucess: true,
      message: `Pet with ID:${petId} updated successfully`,
      info: {
        count: 1,
      },
      data: {
        pet: updatedPet
      }
    })
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      message: error.message,
    })
  }

}

/**
 * CRUD: Delete an existing pet in the database by his Id.
 * @param {Object} req - An object that includes as a parameter the pet Id to be deleted.
 * @returns {Object} res - An object in JSON format that includes the deleted pet info.
 */
const deleteOnePet = async (req, res) => {
  const petId = req.params.petId
  if (!petId) {
    return res.status(404).json({
      success: false,
      message: `Pet ID ${petId} parameter are missing in your request.`
    })
  }
  try {
    const deletedPet = await PetService.deleteOnePet(petId)
    if (!deletedPet) {
      return res.status(404).json({
        success: false,
        message: `Pet ID ${petId} is not finded on database.`
      })
    }
    return res.status(201).json({
      sucess: true,
      message: `Pet with ID:${petId} deleted successfully`,
      info: {
        count: 1,
      },
      data: {
        pet: deletedPet,
      }
    })
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      message: error.message,
    })
  }
}

/**
 * Retrieves all pets that match a specific query.
 * @param {Object} req - An object that includes in query parameters the filter to be applied.
 * @returns {Object} res - An object in JSON format that includes all pets recovered in an array.
 */
const getAllPets = async (req, res) => {
  const queryParams = req.query
  try {
    const allPets = await PetService.getAllPets(queryParams)
    if (!allPets) {
      return res.status(404).json({
        sucess: false,
        message: 'There are no registered pets at this time!'
      })
    }
    return res.status(201).json({
      sucess: true,
      message: 'Pets info recovered successfully!',
      info: {
        count: allPets.length,
      },
      data: {
        pets: allPets
      }
    })
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      message: error.message,
    })
  }
}

module.exports = {
  createNewPet,
  getOnePet,
  updateOnePet,
  deleteOnePet,
  getAllPets
}
