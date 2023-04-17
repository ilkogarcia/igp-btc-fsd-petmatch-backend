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
  try {
    const createdPet = await PetService.createNewPet(newPet)
    return res.status(201).json({
      sucess: true,
      message: 'Successfully added the new pet to the database.',
      data: createdPet || []
    })
  } catch (error) {
    return res.status(error?.status || 500).json({
      sucess: false,
      message: error?.message || 'Unknow error',
      data: error
    })
  }
}

/**
 * CRUD: Get an existing pet from the database.
 * @param {Object} req - An object that includes as a parameter the pet Id to be deleted.
 * @returns {Object} res - An object in JSON format that includes the retrieved pet info.
 */
const getOnePet = async (req, res) => {
  const { params: { petId } } = req
  if (!petId) {
    return res.status(400).json({
      status: false,
      message: `Parameter ':petId' can not be empty`
    })
  }
  try {
    const pet = await PetService.getOnePet(petId)
    if (!pet) {
      return res.status(404).json({
        success: false,
        message: `Can't find a pet with the id '${petId}'.`,
        data: error
      })
    }
    return res.status(201).json({
      sucess: true,
      message: `Pet with the id '${petId}' recovered successfully`,
      data: pet || []
    })
  } catch (error) {
    return res.status(error?.status || 500).json({
      sucess: false,
      message: error?.message || 'Unknow error',
      data: error
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
        message: `Can't find pet with the id '${petId}'.`,
        data: error
      })
    }
    return res.status(201).json({
      sucess: true,
      message: `Pet with the id '${petId}' was updated successfully`,
      data: updatedPet || []
    })
  } catch (error) {
    return res.status(error?.status || 500).json({
      sucess: false,
      message: error?.message || 'Unknow error',
      data: error
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
        message: `Can't find pet with the id '${petId}'.`,
        data: error
      })
    }
    return res.status(201).json({
      sucess: true,
      message: `Pet with the id '${petId}' was deleted successfully`,
      data: deletedPet || []
    })
  } catch (error) {
    return res.status(error?.status || 500).json({
      sucess: false,
      message: error?.message || 'Unknow error',
      data: error
    })
  }
}

/**
 * Retrieves all pets that match a specific query.
 * @param {Object} req - An object that includes in query parameters the filter to be applied.
 * @returns {Object} res - An object in JSON format that includes all pets recovered in an array.
 */
const getAllPets = async (req, res) => {
  const limit = parseInt(req.query.limit) || 5
  const page = parseInt(req.query.page) || 1

  if (limit <= 0 || page <= 0) {
    return res.status(400).json({
      status: false,
      message: `Pagination parameters 'limit' and 'page' have to be greater than 0.`
    })
  }

  const { filterParams } = req.body
  const { orderParams } = req.body

  try {
    const offset = (page - 1) * limit
    const pets = await PetService.getAllPets(limit, offset, filterParams, orderParams)
    if (!pets) {
      return res.status(404).json({
        sucess: false,
        message: `Can't find more pets on database at this time.`,
        data: error
      })
    }
    return res.status(201).json({
      sucess: true,
      message: 'Pets info recovered successfully.',
      info: {
        total: pets.count,
        limit: limit,
        page: page,
        offset: offset,
      },
      data: {
        pets: pets.rows || []
      }

    })
  } catch (error) {
    return res.status(error?.status || 500).json({
      sucess: false,
      message: error?.message || 'Unknow error',
      data: error
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
