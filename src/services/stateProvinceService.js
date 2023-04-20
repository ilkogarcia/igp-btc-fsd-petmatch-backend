/* eslint-disable no-throw-literal */
/**
 * @module services/stateProvinceService
 * @description StateProvince services
 * @requires models/index
 */

// Import models used by this service
const { StateProvince } = require('../models')

/**
 * Get all state or provices from database that correspond to an specific country or all of them.
 * @param {Object} filterParams - An object that can optionally include "countryId" as a parameter to filter the query to the database.
 * @returns {Object} An object "stateProvinces" that include and array with all the stateProvinces data retrieved.
 */

const getAllStateProvinces = async (filterParams) => {
  try {
    const { countryId } = filterParams
    const condition = (countryId) ? { countryId } : {}
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
