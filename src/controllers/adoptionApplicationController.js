/* eslint-disable no-throw-literal */
/**
 * @module controllers/adoptionApplicationController
 * @description Adoption Application controller.
 */

// Import adoption application service
const AdoptionApplication = require('../services/adoptionApplicationService')

/**
 * @function createNewAdoptionApplication
 * @param {Object} req - Request object containing the adoption application data.
 * @param {Object} res - Returns an object with the adoption application data.
 * @throws {Object} - Returns an object with the error message.
 */

const createNewAdoptionApplication = async (req, res) => {
  // Get the adoption application data from the request body
  const { body: adoptionApplicationData } = req
  if (!adoptionApplicationData) {
    return res.status(400).json({
      status: false,
      message: 'The adoption application data is missing. Please provide an adoption application data and try again.'
    })
  }

  // Avoid that someone else creates an adoption application for another user
  const hasApplicationWithUserId = Object.values(adoptionApplicationData).some(application => application.userId === req.userId)
  const updatedAdoptionApplicationData = (hasApplicationWithUserId)
    ? adoptionApplicationData
    : { ...adoptionApplicationData, userId: req.userId }

  try {
    const adoptionApplication = await AdoptionApplication.createNewAdoptionApplication(updatedAdoptionApplicationData)
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
 * @returns {Object} res - Returns an object with the adoption application data.
 * @throws {Object} - Returns an object with the error message.
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

/**
 * @function getAllAdoptionApplications - CRUD: Retrieves all adoption applications.
 * @param {Object} req - Request object including the adoption application id and the new adoption application data.
 * @returns {Object} res - Returns an object with the adoption application data.
 * @throws {Object} - Returns an object with the error message.
 */
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

  // Avoid changes in the application owner, forcing the user ID to be the same as the one in the token
  if (adoptionApplicationData.userId) {
    adoptionApplicationData.userId = req.userId
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

/**
 * @function deleteOneAdoptionApplication - CRUD: Deletes an adoption application by id.
 * @param {Object} req - Request object including the adoption application id.
 * @returns {Object} res - Returns an object with the adoption application already deleted.
 * @throws {Object} - Returns an object with the error message.
 */

const deleteOneAdoptionApplication = async (req, res) => {
  const { params: { adoptionId } } = req
  if (!adoptionId) {
    return res.status(400).json({
      status: false,
      message: 'The adoption application ID is missing. Please provide an adoption application ID and try again.'
    })
  }
  try {
    const adoptionApplication = await AdoptionApplication.deleteOneAdoptionApplication(req.userId, adoptionId)
    if (!adoptionApplication) {
      return res.status(404).json({
        sucess: false,
        message: `We couldn't find an adoption application with the ID you provided (${adoptionId}).`
      })
    }
    return res.status(200).json({
      sucess: true,
      message: 'Your adoption application has been deleted successfully.',
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

/**
 * @function getAllAdoptionApplications - Retrieves all adoption applications.
 * @param {Object} req - Request object with the pagination, filter and order parameters.
 * @returns {Object} res - Returns an object with a list of adoption applications.
 * @throws {Object} - Returns an object with the error message.
 */

const getAllAdoptionApplications = async (req, res) => {
  // Get the pagination parameters from the request query and set default values
  const limit = parseInt(req.query.limit) || 5
  const page = parseInt(req.query.page) || 1

  // Avoid negative values for limit and page
  if (limit <= 0 || page <= 0) {
    return res.status(400).json({
      status: false,
      message: 'Pagination parameters \'limit\' and \'page\' have to be greater than 0.'
    })
  }

  // Calculate the offset
  const offset = (page - 1) * limit

  // Get the filter parameters from the request body and force the user ID to be the same as the one in the token
  const { filterParams } = req.body
  const updatedFilterParams = {
    ...filterParams,
    user: req.userId
  }

  // Get the order parameters from the request body
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
