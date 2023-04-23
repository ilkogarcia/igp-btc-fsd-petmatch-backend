/**
 * @module middlewares/shelterPolicy
 * @description Module containing all policies applied on the different shelter endpoints.
 * @requires joi
 */

// Import validation library
const Joi = require('joi')

const newShelterPolicy = async (req, res, next) => {
  try {
    const { body: shelterData } = req
    if (!shelterData) {
      return res.status(400).json({
        status: false,
        message: 'The shelter data is missing. Please provide a shelter data and try again.'
      })
    }

    // Define the schema for validating new shelters
    const shelterSchema = Joi.object({
      cityId: Joi.number().integer().required(),
      stateProvinceId: Joi.number().integer().required(),
      countryId: Joi.number().integer().required(),
      addressLine1: Joi.string().regex(/^[a-zA-Z0-9\s\-.,/]+$/).allow(null),
      addressLine2: Joi.string().regex(/^[a-zA-Z0-9\s\-.,/]+$/).allow(null),
      postalCode: Joi.string().pattern(/^[0-9]{5}$/).allow(null),
      name: Joi.string().required().min(1).max(100),
      description: Joi.string().min(1).max(1000).allow(null),
      contactPhone: Joi.string().regex(/^[0-9]{9}$/).allow(null),
      contactEmail: Joi.string().email({ tlds: { allow: false } }).allow(null),
      webUrl: Joi.string().uri({ scheme: ['http', 'https'] }).allow(null)
    })

    // Validate the request body against the schema
    const { error, value } = await shelterSchema.validate(shelterData)

    if (error) {
      // Handle validation error
      return res.status(500).json({
        sucess: false,
        message: 'Shelter data you provided is invalid. Please double-check the data you submitted and try again.',
        error: error.details[0].message
      })
    }
    // Set the default value for userId if it is not present
    req.shelterData = value

    next()
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: 'We apologize for the inconvenience. Our server encountered an unexpected error while processing your request. Please try again later or contact our support team for assistance.',
      data: error
    })
  }
}

const getShelterPolicy = async (req, res, next) => {
  try {
    next()
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: 'Something went wrong!',
      data: error
    })
  }
}

const updateShelterPolicy = async (req, res, next) => {
  try {
    next()
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: 'Something went wrong!',
      data: error
    })
  }
}

const deleteShelterPolicy = async (req, res, next) => {
  try {
    next()
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: 'Something went wrong!',
      data: error
    })
  }
}

const getAllSheltersPolicy = async (req, res, next) => {
  try {
    next()
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: 'Something went wrong!',
      data: error
    })
  }
}

module.exports = {
  newShelterPolicy,
  getShelterPolicy,
  updateShelterPolicy,
  deleteShelterPolicy,
  getAllSheltersPolicy
}
