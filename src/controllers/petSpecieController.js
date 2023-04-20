/**
 * @module controllers/petSpecieController
 * @description Receive requests and responsible for calling the service layer and returning the response to the client.
 */

// Import services used on this controller
const PetSpecieService = require('../services/petSpecieService')

/**
 * CRUD: Get one pet specie by his id using the service layer
 * @param {Object} req - An object that includes all the request data.
 * @param {Object} res - An object in JSON format that includes all data retrived.
 */

const getOnePetSpecie = async (req, res) => {
  try {
    const { params: { petSpecieId } } = req
    const petSpecie = await PetSpecieService.getOnePetSpecie(petSpecieId)
    if (!petSpecie) {
      return res.status(404).json({
        sucess: false,
        message: `Can't find any pet specie with this id: ${petSpecieId}.`
      })
    }
    return res.status(201).json({
      sucess: true,
      message: 'Pet specie info recovered successfully.',
      data: {
        petSpecie
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
 * Get all pet species using the service layer
 * @param {Object} req - An object containing "specieId" as a filter parameters to be used in the query.
 * @returns {Object} res - An object in JSON format that includes all data retrieved.
 * @example { sucess: true, message: 'Pet species info recovered successfully.', info: { total: 2 }, data: { petSpecies: [ { id: 1, specieId: 1, petSpecieName: 'Bulldog' }, { id: 2, specieId: 1, petSpecieName: 'Poodle' } ] } }
 */

const getAllPetSpecies = async (req, res) => {
  try {
    const { filterParams } = req.body
    const { orderParams } = req.body
    const petSpecies = await PetSpecieService.getAllPetSpecies(filterParams, orderParams)
    if (!petSpecies) {
      return res.status(404).json({
        sucess: false,
        message: "Can't find any pet specie."
      })
    }
    return res.status(201).json({
      sucess: true,
      message: 'Pet species info recovered successfully.',
      info: {
        total: petSpecies.count
      },
      data: {
        petSpecies: petSpecies.rows || []
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
  getOnePetSpecie,
  getAllPetSpecies
}
