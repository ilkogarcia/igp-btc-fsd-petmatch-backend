/**
 * @file cityController.js
 * @description City controller
 */

// Import city service used by this controller
const CityService = require('../services/cityService')

const getAllCities = async (req, res) => {
  try {
    // Get state or province id from request
    const { stateProvinceId } = req.query
    // Get all cities
    const cities = await CityService.getAllCities({ stateProvinceId })
    // Check the fetched data from database
    if (!cities) {
      return res.status(404).json({
        sucess: false,
        message: "Can't find any city."
      })
    }
    // Return the fetched data
    return res.status(201).json({
      sucess: true,
      message: 'Cities info recovered successfully.',
      info: {
        total: cities.count
      },
      data: {
        cities: cities.rows || []
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
  getAllCities
}
