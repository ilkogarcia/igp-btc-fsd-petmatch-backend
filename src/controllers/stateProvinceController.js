/**
 * @file stateProvinceController.js
 * @description State and province controllers
 */

// Import services used by this controller
const StateProvinceService = require('../services/stateProvinceService')

/**
 * Get all state or provices from database
 * @param {Object} req - An object containing 'countryId' as a filter parameters to be used in the query.
 * @returns {Object} res - An object in JSON format that includes all the stateProvinces data that was retrieved.
 */

const getAllStateProvinces = async (req, res) => {
  try {
    const { countryId } = req.query
    const stateProvinces = await StateProvinceService.getAllStateProvinces({ countryId })
    if (!stateProvinces) {
      return res.status(404).json({
        sucess: false,
        message: "Can't find any state or province."
      })
    }
    return res.status(201).json({
      sucess: true,
      message: 'State or provinces info recovered successfully.',
      info: {
        total: stateProvinces.count
      },
      data: {
        stateProvinces: stateProvinces.rows || []
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
  getAllStateProvinces
}
