/**
 * @module controllers/petStatusController
 * @description Receive requests and responsible for calling the service layer and returning the response to the client.
 */

// Import services used on this controller
const PetStatusService = require('../services/petStatusService')

/**
 * CRUD: Get one pet status by his id using the service layer
 * @param {Object} req - An object that includes all the request data.
 * @param {Object} res - An object in JSON format that includes all data retrived.
 */

const getOnePetStatus = async (req, res) => {
  try {
    const { params: { petStatusId } } = req
    const petStatus = await PetStatusService.getOnePetStatus(petStatusId)
    if (!petStatus) {
      return res.status(404).json({
        sucess: false,
        message: `Can't find any pet status with this id: ${petStatusId}.`
      })
    }
    return res.status(201).json({
      sucess: true,
      message: 'Pet status info recovered successfully.',
      data: {
        petStatus
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
 * @example { sucess: true, message: 'Pet species info recovered successfully.', info: { total: 2 }, data: { petStatuss: [ { id: 1, specieId: 1, petStatusName: 'Bulldog' }, { id: 2, specieId: 1, petStatusName: 'Poodle' } ] } }
 */

const getAllPetStatuses = async (req, res) => {
  try {
    const { filterParams } = req.body
    const { orderParams } = req.body
    const petStatuses = await PetStatusService.getAllPetStatuses(filterParams, orderParams)
    if (!petStatuses) {
      return res.status(404).json({
        sucess: false,
        message: `Can't find any pet status with this filter: ${filterParams}.`
      })
    }
    return res.status(201).json({
      sucess: true,
      message: `Recovered successfully ${petStatuses.count} pet status(es).`,
      info: {
        total: petStatuses.count
      },
      data: {
        petStatuses: petStatuses.rows || []
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
  getOnePetStatus,
  getAllPetStatuses
}
