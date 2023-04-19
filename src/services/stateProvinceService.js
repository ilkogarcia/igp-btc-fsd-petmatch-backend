/* eslint-disable no-throw-literal */
/**
 * @file stateProvinceService.js
 * @description StateProvince services
 */

// Import models used by this service
const { StateProvince } = require('../models')

/**
 * Get all state or provices from database that correspond to an specific country or all of them.
 * @param {Object} filterParams - An object containing 'countryId' as a filter parameters to be used in the query.
 * @returns {Object} stateProvinces - An object that includes all the stateProvinces data that was retrieved.
 */

const getAllStateProvinces = async (filterParams) => {
  try {
    // Get country id from filterParams
    const { countryId } = filterParams

    // Set condition to get all state or provinces from specific country
    const condition = (countryId) ? { countryId } : {}

    // Get all stateProvinces
    const stateProvinces = await StateProvince.findAndCountAll({
      where: { ...condition },
      attributes: ['id', 'stateProvinceName', 'countryId'],
      order: [['stateProvinceName', 'ASC']]
    })
    if (!stateProvinces) {
      throw {
        status: 404,
        message: "Can't find any stateProvince."
      }
    }
    return stateProvinces
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || 'Internal server error.'
    }
  }
}

module.exports = {
  getAllStateProvinces
}
