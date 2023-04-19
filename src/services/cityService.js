/* eslint-disable no-throw-literal */
/**
 * @file cityService.js
 * @description City services
 */

// Import models used by this service
const { City } = require('../models')

/**
 * Get all cities from database corrsponding to an specific state or province or all of them.
 * @param {Object} filterParams - An object containing 'stateProvinceId' as a filter parameters to be used in the query.
 * @returns {Object} cities - An object that includes all the cities data that was retrieved.
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
