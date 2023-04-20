/**
 * @file cityController.js
 * @description City controller
 */

// Import city service used by this controller
const CityService = require('../services/cityService')

const getAllCities = async (req, res) => {
  try {
    const { stateProvinceId } = req.query
    const cities = await CityService.getAllCities({ stateProvinceId })
    if (!cities) {
      return res.status(404).json({
        sucess: false,
        message: "Can't find any city."
      })
    }
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
