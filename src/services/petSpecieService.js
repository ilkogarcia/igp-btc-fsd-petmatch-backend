/* eslint-disable no-throw-literal */
/**
 * @module service/petSpecieService
 * @description Service layer to handle the business logic (including validation specific) applied to the pet species data we have on the platform.
 * @requires sequelize/lib/operators
 * @requires models/index
 */

// Import libraries needed by this service
const { Op } = require('sequelize')

// Import models used by this service
const { PetSpecie } = require('../models')

/**
 * CRUD: Get one pet specie by his id from database
 * @param {number} petSpecieId - The id of the pet specie to retrieve.
 * @returns {Object} An object "petSpecie" that include the pet specie data retrieved.
 * @example { id: 1, specieCommonName: 'Dog', specieScientificName: 'Canis lupus familiaris', specieDescription: 'The domestic dog is a member of the genus Canis (canines), which forms part of the wolf-like canids, and is the most widely abundant terrestrial carnivore.', isActive: true }
 * @throws {Object} An object "error" that include the error message and status code.
 */

const getOnePetSpecie = async (petSpecieId) => {
  try {
    const petSpecie = await PetSpecie.findByPk(petSpecieId, {
      attributes: ['id', 'specieCommonName', 'specieScientificName', 'specieDescription', 'isActive']
    })
    if (!petSpecie) {
      throw {
        status: 404,
        message: `Can't find any pet specie with id ${petSpecieId}.`
      }
    }
    return petSpecie
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || 'Internal server error.'
    }
  }
}

/**
 * Get all pet species from database
 * @param {Object} filterParams - An object that can optionally include "specieId" as a parameter to filter the query to the database.
 * @returns {Object} An object "petSpecies" that include an array with all the pet species data retrieved.
 * @throws {Object} An object "error" that include the error message and status code.
 */

const getAllPetSpecies = async (filterParams, orderParams) => {
  try {
    // Build filter species condition
    const { specieCommonName, isActive } = filterParams
    const specieNameCondition = (specieCommonName) ? { specieCommonName: { [Op.like]: `%${specieCommonName}%` } } : {}

    // Build order conditions (order field and order direction)
    const orderConditions = orderParams
      ? orderParams.map((order) => [order.field, order.direction])
      : [['id', 'ASC']]

    const petSpecies = await PetSpecie.findAndCountAll({
      where: { ...specieNameCondition, isActive },
      attributes: ['id', 'specieCommonName', 'specieScientificName', 'specieDescription', 'isActive'],
      order: orderConditions
    })
    if (!petSpecies) {
      throw {
        status: 404,
        message: "Can't find any pet specie."
      }
    }
    return petSpecies
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || 'Internal server error.'
    }
  }
}

module.exports = {
  getOnePetSpecie,
  getAllPetSpecies
}
