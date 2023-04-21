/* eslint-disable no-throw-literal */
/**
 * @module controllers/adoptionApplicationController
 * @description Adoption Application controller.
 */

// Import adoption application service
const AdoptionApplication = require('../services/adoptionApplicationService')

/**
 * @function createNewAdoptionApplication
 */

const createNewAdoptionApplication = async (req, res) => {
  try {
    const adoptionApplication = await AdoptionApplication.createNewAdoptionApplication(req.body)
    return res.status(201).json({
      status: true,
      message: 'Adoption application created successfully.',
      data: adoptionApplication
    })
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: 'We apologize for the inconvenience. Our server encountered an unexpected error while processing your request. Please try again later or contact our support team for assistance.',
      data: error
    })
  }
}

/**
 * @function getOneAdoptionApplication - CRUD: Retrieves an adoption application by id.
 * @param {Object} req - Request object including the adoption application id.
 * @returns {Object} Returns an object with the adoption application data.
 * @throws {object} - Returns an object with the error message.
 */

const getOneAdoptionApplication = async (req, res) => {
  const { params: { adoptionId } } = req
  if (!adoptionId) {
    return res.status(400).json({
      status: false,
      message: 'The adoption application ID is missing. Please provide an adoption application ID and try again.'
    })
  }
  try {
    const adoptionApplication = await AdoptionApplication.getOneAdoptionApplication(adoptionId)

    if (!adoptionApplication) {
      return res.status(404).json({
        sucess: false,
        message: `We couldn't find an adoption application with the ID you provided (${adoptionId}).`
      })
    }

    if (adoptionApplication.userId !== req.userId && req.userRole !== 'administrator') {
      return res.status(403).json({
        status: false,
        message: 'Access to this resource is not allowed. Please log in again with the correct user credentials to access this resource.'
      })
    }

    return res.status(200).json({
      status: true,
      message: 'Your adoption application has been retrieved successfully. Here are the details of your application.',
      data: adoptionApplication
    })
  } catch (error) {
    return res.status(error.status || 500).json({
      status: false,
      message: 'We apologize for the inconvenience. Our server encountered an unexpected error while processing your request. Please try again later or contact our support team for assistance.',
      data: error
    })
  }
}

const updateOneAdoptionApplication = async (req, res) => {
  // Get the adoption application ID from the request parameters
  const { params: { adoptionId } } = req
  if (!adoptionId) {
    return res.status(400).json({
      status: false,
      message: 'The adoption application ID is missing. Please provide an adoption application ID and try again.'
    })
  }

  // Get the adoption application data from the request body
  const { body: adoptionApplicationData } = req
  if (!adoptionApplicationData) {
    return res.status(400).json({
      status: false,
      message: 'The adoption application data is missing. Please provide an adoption application data and try again.'
    })
  }

  try {
    // Update the adoption application sending all information to the service
    const adoptionApplication = await AdoptionApplication.updateOneAdoptionApplication(req.userId, adoptionId, adoptionApplicationData)
    if (!adoptionApplication) {
      return res.status(404).json({
        sucess: false,
        message: `We couldn't find an adoption application with the ID you provided (${req.params.adoptionId}).`
      })
    }
    return res.status(200).json({
      sucess: true,
      message: 'Your adoption application has been updated successfully.',
      data: adoptionApplication
    })
  } catch (error) {
    return res.status(error.status || 500).json({
      status: false,
      message: 'We apologize for the inconvenience. Our server encountered an unexpected error while processing your request. Please try again later or contact our support team for assistance.',
      data: error
    })
  }
}

const deleteOneAdoptionApplication = async (req, res) => {
  return res
    .status(200)
    .json({
      sucess: true,
      message: `You are trying to update the adoption application with the ID ${req.params.adoptionId}`
    })
}

const getAllAdoptionApplications = async (req, res) => {
  const limit = parseInt(req.query.limit) || 5
  const page = parseInt(req.query.page) || 1

  if (limit <= 0 || page <= 0) {
    return res.status(400).json({
      status: false,
      message: 'Pagination parameters \'limit\' and \'page\' have to be greater than 0.'
    })
  }

  const offset = (page - 1) * limit

  const { filterParams } = req.body
  const updatedFilterParams = {
    ...filterParams,
    user: req.userId
  }

  // use updatedFilterParams in your controller

  const { orderParams } = req.body

  try {
    const adoptionApplications = await AdoptionApplication.getAllAdoptionApplications(limit, offset, updatedFilterParams, orderParams)
    if (!adoptionApplications) {
      return res.status(404).json({
        sucess: false,
        message: 'We could not find any adoption applications.'
      })
    }
    return res.status(201).json({
      sucess: true,
      message: 'Adoption applications retrieved successfully.',
      info: {
        total: adoptionApplications.count,
        pages: Math.ceil(adoptionApplications.count / limit),
        page,
        limit,
        offset
      },
      data: {
        adoptionApplications: adoptionApplications.rows || []
      }
    })
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      message: 'We apologize for the inconvenience. Our server encountered an unexpected error while processing your request. Please try again later or contact our support team for assistance.',
      data: error
    })
  }
}

module.exports = {
  createNewAdoptionApplication,
  getOneAdoptionApplication,
  updateOneAdoptionApplication,
  deleteOneAdoptionApplication,
  getAllAdoptionApplications
}
