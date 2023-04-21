/**
 * @module middlewares/adoptionApplicationPolicy
 * @description Module containing all policies applied on the different adoption application endpoints.
 * @requires joi
 */

// Import validation library
const Joi = require('joi')

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
    const adoptionSchema = Joi.object({
      userId: Joi.number().integer().default(req.userId),
      petId: Joi.number().integer().required(),
      shelterId: Joi.number().integer().required(),
      statusId: Joi.number().integer().required(),
      applicationDate: Joi.date().iso().allow(null),
      approvalDate: Joi.date().iso().allow(null),
      rejectionDate: Joi.date().iso().allow(null),
      applicationNotes: Joi.string().allow(null, '').min(1).max(1000)
    })

    // Validate the request body against the schema
    const { error, value } = await adoptionSchema.validate({ ...adoptionApplicationData })
    if (error) {
      return res.status(500).json({
        sucess: false,
        message: 'Adoption application data you provided is invalid. Please double-check the data you submitted and try again.',
        error: error.details[0].message
      })
    }

    req.adoptionApplicationData = value
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
  newAdoptionPolicy
}
