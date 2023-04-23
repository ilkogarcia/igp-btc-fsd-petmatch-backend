/* eslint-disable no-throw-literal */
/**
 * @module services/shelterService
 * @description Shelter service.
 * @requires models/index
 * @requires sequelize/lib/operators
 */

// Import dependencies
const { Op } = require('sequelize')

// Import models used by this service
const { Shelter, City, StateProvince, Country } = require('../models')

/**
 * @function createNewShelter - CRUD: Create a new shelter in database.
 * @param {Object} newShelter - An object that includes all the shelter data to be created.
 * @returns {Object} createdShelter - An object that includes all the shelter data that was created.
 * @throws {Object} error - An object that includes an error message.
 */

const createNewShelter = async (newShelter) => {
  try {
    // Check if the shelter already exists
    const shelterAlreadyAdded = await Shelter.findOne({
      where: {
        name: newShelter.name,
        cityId: newShelter.cityId,
        stateProvinceId: newShelter.stateProvinceId,
        countryId: newShelter.countryId
      }
    })
    if (shelterAlreadyAdded) {
      throw {
        status: 400,
        message: `A shelter with the name '${newShelter.name}' already exists in that city, state and country.`
      }
    }
    // Create the new shelter with all the data passed in the newShelter object
    const createdShelter = await Shelter.create(newShelter)
    return createdShelter
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || 'Internal server error.'
    }
  }
}

/**
 * @function getOneShelter - CRUD: Get one existing shelter by id from the database.
 * @param {Number} shelterId - The id of the shelter to retrieve.
 * @returns {Object} shelter - An object that includes all the shelter data that was retrieved.
 * @throws {Object} error - An object that includes an error message.
 */

const getOneShelter = async (shelterId) => {
  try {
    // Get the shelter by id and throw an error if not found
    const shelter = await Shelter.findByPk(shelterId)
    if (!shelter) {
      throw {
        status: 404,
        message: `Can't find shelter with the id '${shelterId}'.`
      }
    }

    return shelter
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || 'Internal server error.'
    }
  }
}

/**
 * @function updateOneShelter - CRUD: Update one existing shelter by id in the database
 * @param {Number} shelterId - The id of the shelter to update.
 * @param {Object} updatedShelter - An object that includes all the shelter data to be updated.
 * @returns {Object} updatedShelter - An object that includes all the shelter data that was updated.
 * @throws {Object} error - An object that includes an error message.
 */

const updateOneShelter = async (shelterId, updatedShelter) => {
  try {
    // Get the shelter by id and throw an error if not found
    const shelter = await Shelter.findByPk(shelterId)
    if (!shelter) {
      throw {
        status: 404,
        message: `Can't find shelter with the id '${shelterId}'.`
      }
    }

    // Check if the new data doesn't match with an existing shelter
    const cityCondition = (updatedShelter.cityId) ? { cityId: { [Op.eq]: `${updatedShelter.cityId}` } } : {}
    const stateCondition = (updatedShelter.stateProvinceId) ? { stateProvinceId: { [Op.eq]: `${updatedShelter.stateProvinceId}` } } : {}
    const countryCondition = (updatedShelter.countryId) ? { countryId: { [Op.eq]: `${updatedShelter.countryId}` } } : {}
    const shelterAlreadyAdded = await Shelter.findOne({
      where: {
        name: updatedShelter.name,
        ...cityCondition,
        ...stateCondition,
        ...countryCondition,
        id: { [Op.ne]: shelterId }
      }
    })
    if (shelterAlreadyAdded) {
      throw {
        status: 400,
        message: `A shelter with the name '${updatedShelter.name}' already exists on database for the same city, state or country.`
      }
    }

    // Update the shelter with all the data passed in the updatedShelter object
    await shelter.update(updatedShelter)

    return shelter
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || 'Internal server error.'
    }
  }
}

/**
 * @function deleteOneShelter CRUD: Delete one existing shelter by id from the database.
 * @param {Number} shelterId - The id of the shelter to delete.
 * @returns {Object} deletedShelter - An object that includes all the shelter data that was deleted.
 * @throws {Object} error - An object that includes an error message.
 */

const deleteOneShelter = async (shelterId) => {
  try {
    // Get the shelter by id and throw an error if not found
    const shelter = await Shelter.findByPk(shelterId)
    if (!shelter) {
      throw {
        status: 404,
        message: `Can't find shelter with the id '${shelterId}'.`
      }
    }

    // Delete the shelter
    await shelter.destroy()

    return shelter
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || 'Internal server error.'
    }
  }
}

/**
 * @function getAllShelters - Get all existing shelters from the database.
 * @param {Object} query - An object that includes all the query parameters.
 * @returns {Object} shelters - An object that includes all the shelters data that was retrieved.
 * @throws {Object} error - An object that includes an error message.
 */

const getAllShelters = async (limit, offset, filterParams, searchParams, orderParams) => {
  const { cityId, stateProvinceId, countryId, postalCode } = filterParams
  const { name, email, phone } = searchParams

  // Filtering conditions for the shelter
  const cityCondition = (cityId) ? { id: { [Op.eq]: `${cityId}` } } : {}
  const stateCondition = (stateProvinceId) ? { id: { [Op.eq]: `${stateProvinceId}` } } : {}
  const countryCondition = (countryId) ? { id: { [Op.eq]: `${countryId}` } } : {}
  const postalCodeCondition = (postalCode) ? { postalCode: { [Op.eq]: `${postalCode}` } } : {}

  // Searching conditions for the shelter
  const nameCondition = (name) ? { name: { [Op.like]: `%${name}%` } } : {}
  const emailCondition = (email) ? { contactEmail: { [Op.like]: `%${email}%` } } : {}
  const phoneCondition = (phone) ? { contactPhone: { [Op.like]: `%${phone}%` } } : {}

  // Create the conditions for the order
  const orderConditions = (orderParams)
    ? orderParams.map((order) => [order.field, order.direction])
    : [['id', 'ASC']]

  try {
    // Get all the shelters
    const shelters = await Shelter.findAndCountAll({
      where: { ...nameCondition, ...postalCodeCondition, ...emailCondition, ...phoneCondition },
      include: [
        {
          model: City,
          where: { ...cityCondition },
          include: [
            {
              model: StateProvince,
              where: { ...stateCondition },
              include: [
                {
                  model: Country,
                  where: { ...countryCondition }
                }]
            }]
        }],
      limit,
      offset,
      order: orderConditions
    })

    return shelters
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || 'Internal server error.'
    }
  }
}

// Export the service functions
module.exports = {
  createNewShelter,
  getOneShelter,
  updateOneShelter,
  deleteOneShelter,
  getAllShelters
}
