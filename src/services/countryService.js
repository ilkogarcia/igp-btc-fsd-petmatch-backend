/* eslint-disable no-throw-literal */
/**
 * @module services/cityService
 * @description City services
 * @requires models/index
 */

// Import models used by this service
const { Country } = require('../models')

/**
 * Get all countries from database
 * @returns {Object} An object "countries" that include an array with all the countries data retrieved.
 * @throws {Object} An object "error" that include the error message and status code.
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
