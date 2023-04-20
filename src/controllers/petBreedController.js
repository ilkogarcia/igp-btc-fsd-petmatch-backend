/**
 * @module controllers/petBreedController
 * @description Pet breed controller
 */

// Import services used on this controller
const PetBreedService = require('../services/petBreedService')

/**
 * Get one pet breed by his id using the service layer
 * @param {Object} req - An object that includes all the request data.
 * @param {Object} res - An object in JSON format that includes all data retrived.
 * @example { sucess: true, message: 'Pet breed info recovered successfully.', data: { petBreed: { id: 1, specieId: 1, petBreedName: 'Bulldog' } } }
 */

const getOnePetBreed = async (req, res) => {
  try {
    const { params: { petBreedId } } = req
    const petBreed = await PetBreedService.getOnePetBreed(petBreedId)
    if (!petBreed) {
      return res.status(404).json({
        sucess: false,
        message: "Can't find any pet breed with this id."
      })
    }
    return res.status(201).json({
      sucess: true,
      message: 'Pet breed info recovered successfully.',
      data: {
        petBreed
      }
    })
  } catch (error) {
    return res.status(error?.status || 500).json({
      sucess: false,
      message: error?.message || 'Internal server error.'
    })
  }
}

/**
 * Get all pet breeds using the service layer
 * @param {Object} req - An object containing "specieId" as a filter parameters to be used in the query.
 * @returns {Object} res - An object in JSON format that includes all data retrieved.
 * @example { sucess: true, message: 'Pet breeds info recovered successfully.', info: { total: 2 }, data: { petBreeds: [ { id: 1, specieId: 1, petBreedName: 'Bulldog' }, { id: 2, specieId: 1, petBreedName: 'Poodle' } ] } }
 */

const getAllPetBreeds = async (req, res) => {
  try {
    const { filterParams } = req.body
    const { orderParams } = req.body
    const petBreeds = await PetBreedService.getAllPetBreeds(filterParams, orderParams)
    if (!petBreeds) {
      return res.status(404).json({
        sucess: false,
        message: "Can't find any pet breed."
      })
    }
    return res.status(201).json({
      sucess: true,
      message: 'Pet breeds info recovered successfully.',
      info: {
        total: petBreeds.count
      },
      data: {
        petBreeds: petBreeds.rows || []
      }
    })
  } catch (error) {
    return res.status(error?.status || 500).json({
      sucess: false,
      message: error?.message || 'Internal server error.'
    })
  }
}

module.exports = {
  getOnePetBreed,
  getAllPetBreeds
}
