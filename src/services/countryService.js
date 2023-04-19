/* eslint-disable no-throw-literal */
/**
 * @file countryService.js
 * @description Country services
 */

// Import models used by this service
const { Country } = require('../models')

/**
 * Get all countries from database
 * @returns {Object} countries - An object that includes all the countries data that was retrieved.
 */

const getAllCountries = async () => {
  try {
    // Get all countries
    const countries = await Country.findAndCountAll({
      attributes: ['id', 'alpha3CountryCode', 'countryName'],
      order: [['countryName', 'ASC']]
    })
    if (!countries) {
      throw {
        status: 404,
        message: "Can't find any country."
      }
    }
    return countries
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || 'Internal server error.'
    }
  }
}

module.exports = {
  getAllCountries
}
