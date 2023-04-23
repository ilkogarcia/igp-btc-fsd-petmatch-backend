/**
 * @module controllers/shelterController
 * @description Shelter controller.
 * @requires services/shelterService
 */

// Import dependencies used in this controller

// Import services used in this controller
const ShelterService = require('../services/shelterService')

/**
 * CRUD: Create a new shelter in database.
 * @param {Object} req - An object that includes a body element with data to create a new shelter.
 * @returns {Object} res - An object in JSON format that includes all info from the recently created shelter.
 * @throws {Object} res - An object in JSON format that includes an error message.
 */

const createNewShelter = async (req, res) => {
  try {
    const { body: shelterData } = req
    const shelter = await ShelterService.createNewShelter(shelterData)
    if (!shelter) {
      return res.status(400).json({
        message: 'Something went wrong while creating the shelter. Please try again later or contact our support team for assistance.',
        data: {}
      })
    }
    return res.status(201).json({
      message: 'Shelter was created successfully, please check the data below.',
      data: shelter
    })
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: 'We apologize for the inconvenience. Our server encountered an unexpected error while processing your request. Please try again later or contact our support team for assistance.',
      data: error
    })
  }
}

/**
 * CRUD: Get one shelter from database by his Id.
 * @param {Object} req - An object that includes the shelter Id to be recovered.
 * @returns {Object} res - An object in JSON format that includes all info from the recently recovered shelter.
 * @throws {Object} res - An object in JSON format that includes an error message.
 */

const getOneShelter = async (req, res) => {
  try {
    const { params: { shelterId } } = req
    const shelter = await ShelterService.getOneShelter(shelterId)
    if (!shelter) {
      return res.status(404).json({
        sucess: false,
        message: `Shelter with id ${shelterId} was not found.`,
        data: {}
      })
    }
    return res.status(201).json({
      sucess: true,
      message: 'Shelter was recovered successfully, please check the data below.',
      data: shelter
    })
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: 'We apologize for the inconvenience. Our server encountered an unexpected error while processing your request. Please try again later or contact our support team for assistance.',
      data: error
    })
  }
}

/**
 * CRUD: Update an existing shelter in database by his Id.
 * @param {Object} req - An object that includes the shelter Id to be updated and the data to update.
 * @returns {Object} res - An object in JSON format that includes all info from the recently updated shelter.
 * @throws {Object} res - An object in JSON format that includes an error message.
 */

const updateOneShelter = async (req, res) => {
  try {
    const { params: { shelterId } } = req
    const { body: shelterData } = req
    const shelter = await ShelterService.updateOneShelter(shelterId, shelterData)
    if (!shelter) {
      return res.status(404).json({
        sucess: false,
        message: `Shelter with id ${shelterId} was not found.`,
        data: {}
      })
    }
    return res.status(201).json({
      sucess: true,
      message: 'Shelter was updated successfully, please check the data below.',
      data: shelter
    })
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: 'We apologize for the inconvenience. Our server encountered an unexpected error while processing your request. Please try again later or contact our support team for assistance.',
      data: error
    })
  }
}

/**
 * CRUD: Delete an existing shelter in database by his Id.
 * @param {Object} req - An object that includes the shelter Id to be deleted.
 * @returns {Object} res - An object in JSON format that includes a success message.
 * @throws {Object} res - An object in JSON format that includes an error message.
 */

const deleteOneShelter = async (req, res) => {
  try {
    const { params: { shelterId } } = req
    const shelter = await ShelterService.deleteOneShelter(shelterId)
    if (!shelter) {
      return res.status(404).json({
        sucess: false,
        message: `Shelter with id ${shelterId} was not found.`,
        data: {}
      })
    }
    return res.status(201).json({
      sucess: true,
      message: 'Shelter was deleted successfully.',
      data: {}
    })
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: 'We apologize for the inconvenience. Our server encountered an unexpected error while processing your request. Please try again later or contact our support team for assistance.',
      data: error
    })
  }
}

/**
 * Get all shelters from database.
 * @param {Object} req - An object that includes the page number to be recovered.
 * @returns {Object} res - An object in JSON format that includes all shelters from database.
 * @throws {Object} res - An object in JSON format that includes an error message.
 */

const getAllShelters = async (req, res) => {
  try {
    // Get pagination data from query params
    const limit = parseInt(req.query.limit) || 10
    const page = parseInt(req.query.page) || 1

    if (limit <= 0 || page <= 0) {
      return res.status(400).json({
        sucess: false,
        message: 'Pagination parameters \'limit\' and \'page\' have to be greater than 0.'
      })
    }

    const offset = (page - 1) * limit

    // Get filters and sort data from request body
    const { body: { filterParams } } = req || {}
    const { body: { searchParams } } = req || {}
    const { body: { orderParams } } = req || {}

    // Get all shelters from database
    const shelters = await ShelterService.getAllShelters(limit, offset, filterParams, searchParams, orderParams)
    if (!shelters) {
      return res.status(404).json({
        sucess: false,
        message: 'Can\'t find any shelter.',
        data: {}
      })
    }
    return res.status(201).json({
      sucess: true,
      message: 'Shelters were recovered successfully, please check the data below.',
      info: {
        total: shelters.count,
        limit,
        page,
        offset
      },
      data: {
        shelters: shelters.rows || []
      }
    })
  } catch (error) {
    return res.status(error?.status || 500).json({
      sucess: false,
      message: error?.message || 'We apologize for the inconvenience. Our server encountered an unexpected error while processing your request. Please try again later or contact our support team for assistance.',
      data: error
    })
  }
}

module.exports = {
  createNewShelter,
  getOneShelter,
  updateOneShelter,
  deleteOneShelter,
  getAllShelters
}
