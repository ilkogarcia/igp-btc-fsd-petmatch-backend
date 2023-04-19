/**
 * @file userController.js
 * @description User controller
 */

// Import services used on this controller
const CountryService = require('../services/countryService')

/**
 * Get all countries from database
 * @returns {Object} res - An object in JSON format that includes all info from the recently created user.
 */

const getAllCountries = async (req, res) => {
  try {
    // Get all countries
    const countries = await CountryService.getAllCountries()
    // Check the fetched data from database
    if (!countries) {
      return res.status(404).json({
        sucess: false,
        message: "Can't find any country."
      })
    }
    // Return the fetched data
    return res.status(201).json({
      sucess: true,
      message: 'Countries info recovered successfully.',
      info: {
        total: countries.count
      },
      data: {
        countries: countries.rows || []
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
  getAllCountries
}
