/* eslint-disable no-throw-literal */
/**
 * @module services/petBreedService
 * @description PetBreed services
 * @requires models/index
 */

// Import models used by this service
const { PetBreed } = require('../models')

/**
 * Get one pet breed by his id from database
 * @param {number} petBreedId - Pet breed id
 * @returns {Object} An object "petBreed" that include the pet breed data retrieved.
 * @throws {Object} An object "error" that include the error message and status code.
 */

const getOnePetBreed = async (petBreedId) => {
  try {
    const petBreed = await PetBreed.findByPk(petBreedId, {
      attributes: ['id', 'specieId', 'breedName', 'averageHeight', 'averageWeight', 'averageLifeExpectancy', 'breedDescription']
    })
    if (!petBreed) {
      throw {
        status: 404,
        message: "Can't find any pet breed with this id."
      }
    }
    return petBreed
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || 'Internal server error.'
    }
  }
}

/**
 * Get all pet breeds from database
 * @param {Object} filterParams - An object that can optionally include "specieId" as a parameter to filter the query to the database.
 * @returns {Object} An object "petBreeds" that include an array with all the pet breeds data retrieved.
 * @throws {Object} An object "error" that include the error message and status code.
 */

const getAllPetBreeds = async (filterParams, orderParams) => {
  try {
    // Build filter species condition
    const { specieId } = filterParams
    const specieCondition = (specieId) ? { specieId } : {}

    // Build order conditions (order column and order direction)
    const orderConditions = orderParams
      ? orderParams.map((order) => [order.field, order.direction])
      : [['breedName', 'ASC']]

    const petBreeds = await PetBreed.findAndCountAll({
      where: { ...specieCondition },
      attributes: ['id', 'specieId', 'breedName', 'averageHeight', 'averageWeight', 'averageLifeExpectancy', 'breedDescription'],
      order: orderConditions
    })
    if (!petBreeds) {
      throw {
        status: 404,
        message: "Can't find any pet breed."
      }
    }
    return petBreeds
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || 'Internal server error.'
    }
  }
}

module.exports = {
  getOnePetBreed,
  getAllPetBreeds
}
