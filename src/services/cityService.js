/* eslint-disable no-throw-literal */
/**
 * @module services/cityService
 * @description City services
 * @requires models/index
 */

// Import models used by this service
const { City } = require('../models')

/**
 * Get all cities from database that match with an specific state or province id, or all of them.
 * @param {Object} filterParams - An object that can optionally include "stateProvinceId" as a parameter to filter the query to the database.
 * @returns {Object} An object "cities" that include and array with all the cities data retrieved.
 */

const getAllCities = async (filterParams) => {
  try {
    // Get state or province id from filterParams
    const { stateProvinceId } = filterParams

    // Set condition to get all cities from specific state or province
    const condition = (stateProvinceId) ? { stateProvinceId } : {}

    // Get all cities
    const cities = await City.findAndCountAll({
      attributes: ['id', 'cityName', 'stateProvinceId'],
      where: { ...condition },
      order: [['cityName', 'ASC']]
    })
    if (!cities) {
      throw {
        status: 404,
        message: "Can't find any city."
      }
    }
    return cities
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || 'Internal server error.'
    }
  }
}

module.exports = {
  getAllCities
}
