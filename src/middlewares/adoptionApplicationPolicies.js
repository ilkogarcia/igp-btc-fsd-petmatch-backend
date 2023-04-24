/**
 * @module middlewares/adoptionApplicationPolicies
 * @description Module containing all policies applied on the different adoption application endpoints.
 * @requires joi
 */

// Import validation library
const Joi = require('joi')

/**
 * @function newAdoptionPolicy - Policy applied on the new adoption application endpoint.
 * @param {Object} req - An object that includes a body element with data to create a new adoption application in the database. 
 * @param {Object} res - An object that will be passed to the next middleware in the stack.
 * @param {Function} next - A function to call the next middleware in the stack.
 */

const newAdoptionPolicy = async (req, res, next) => {
  try {
    const { body: adoptionApplicationData } = req
    if (!adoptionApplicationData) {
      return res.status(400).json({
        status: false,
        message: 'The adoption application data is missing. Please provide an adoption application data and try again.'
      })
    }

    // Define the schema for validating new adoption applications
    const adoptionSchema = Joi.alternatives().try(
      Joi.object({
        userId: Joi.number().integer().when(Joi.ref('$userId'), {
          is: Joi.exist(),
          then: Joi.number().equal(Joi.ref('$userId')),
          otherwise: Joi.number().equal(Joi.ref('$userId'))
        }),
        petId: Joi.number().integer().required(),
        shelterId: Joi.number().integer().required(),
        statusId: Joi.number().integer().required(),
        applicationDate: Joi.date().iso().allow(null),
        approvalDate: Joi.date().iso().allow(null),
        rejectionDate: Joi.date().iso().allow(null),
        applicationNotes: Joi.string().allow(null, '').min(1).max(1000)
      }),
      Joi.object({})
    )

    // Validate the request body against the schema
    const { error, value } = await adoptionSchema.validate(adoptionApplicationData, { context: { userId: req.userId } })
    if (error) {
      // Handle validation error
      return res.status(500).json({
        sucess: false,
        message: 'Adoption application data you provided is invalid. Please double-check the data you submitted and try again.',
        error: error.details[0].message
      })
    }
    // Set the default value for userId if it is not present
    req.adoptionApplicationData = { ...value, userId: value.userId || req.userId }

    next()
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: 'We apologize for the inconvenience. Our server encountered an unexpected error while processing your request. Please try again later or contact our support team for assistance.',
      data: error
    })
  }
}

/**
 * @function getAllAdoptionPolicy - Policy applied on the get all adoption applications endpoint.
 * @param {Object} req - An object that includes the id of the adoption applications to get.
 * @param {Object} res - An object that will be passed to the next middleware in the stack.
 * @param {Function} next - A function to call the next middleware in the stack.
 */

const getAdoptionPolicy = async (req, res, next) => {
  try {
    const { params: { adoptionId } } = req
    if (!adoptionId) {
      return res.status(400).json({
        status: false,
        message: 'The adoption application ID is missing. Please provide an adoption application ID and try again.'
      })
    }
    next()
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: 'We apologize for the inconvenience. Our server encountered an unexpected error while processing your request. Please try again later or contact our support team for assistance.',
      data: error
    })
  }
}

/**
 * @function updateAdoptionPolicy - Policy applied on the update adoption application endpoint.
 * @param {Object} req - An object that includes the id of the adoption application to update.
 * @param {Object} res - An object that will be passed to the next middleware in the stack.
 * @param {Function} next - A function to call the next middleware in the stack.
 */

const updateAdoptionPolicy = async (req, res, next) => {
  try {
    const { params: { adoptionId } } = req
    if (!adoptionId) {
      return res.status(400).json({
        status: false,
        message: 'The adoption application ID is missing. Please provide an adoption application ID and try again.'
      })
    }
    const { body: adoptionApplicationData } = req
    if (!adoptionApplicationData) {
      return res.status(400).json({
        status: false,
        message: 'The adoption application data is missing. Please provide an adoption application data and try again.'
      })
    }
    // Define the schema for validating new adoption applications
    const adoptionSchema = Joi.alternatives().try(
      Joi.object({
        userId: Joi.number().integer().when(Joi.ref('$userId'), {
          is: Joi.exist(),
          then: Joi.number().equal(Joi.ref('$userId')),
          otherwise: Joi.number().equal(Joi.ref('$userId'))
        }),
        petId: Joi.number().integer().required(),
        shelterId: Joi.number().integer().required(),
        statusId: Joi.number().integer().required(),
        applicationDate: Joi.date().iso().allow(null),
        approvalDate: Joi.date().iso().allow(null),
        rejectionDate: Joi.date().iso().allow(null),
        applicationNotes: Joi.string().allow(null, '').min(1).max(1000)
      }),
      Joi.object({})
    )
    // Validate the request body against the schema
    const { error, value } = await adoptionSchema.validate(adoptionApplicationData, { context: { userId: req.userId } })
    if (error) {
      // Handle validation error
      return res.status(500).json({
        sucess: false,
        message: 'Adoption application data you provided is invalid. Please double-check the data you submitted and try again.',
        error: error.details[0].message
      })
    }
    // Set the default value for userId if it is not present
    req.adoptionApplicationData = { ...value, userId: value.userId || req.userId }

    next()
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: 'We apologize for the inconvenience. Our server encountered an unexpected error while processing your request. Please try again later or contact our support team for assistance.',
      data: error
    })
  }
}

/**
 * @function deleteAdoptionPolicy - Policy applied on the delete adoption application endpoint.
 * @param {Object} req - An object that includes the id of the adoption application to delete.
 * @param {Object} res - An object that will be passed to the next middleware in the stack.
 * @param {Function} next - A function to call the next middleware in the stack.
 */

const deleteAdoptionPolicy = async (req, res, next) => {
  try {
    const { params: { adoptionId } } = req
    if (!adoptionId) {
      return res.status(400).json({
        status: false,
        message: 'The adoption application ID is missing. Please provide an adoption application ID and try again.'
      })
    }
    next()
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: 'We apologize for the inconvenience. Our server encountered an unexpected error while processing your request. Please try again later or contact our support team for assistance.',
      data: error
    })
  }
}

const getAllAdoptionPolicy = async (req, res, next) => {
  try {
    next()
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: 'We apologize for the inconvenience. Our server encountered an unexpected error while processing your request. Please try again later or contact our support team for assistance.',
      data: error
    })
  }
}

module.exports = {
  newAdoptionPolicy,
  getAdoptionPolicy,
  updateAdoptionPolicy,
  deleteAdoptionPolicy,
  getAllAdoptionPolicy
}
