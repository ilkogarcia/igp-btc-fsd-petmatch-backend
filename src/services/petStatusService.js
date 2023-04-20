/* eslint-disable no-throw-literal */
/**
 * @module service/petStatuseservice
 * @description Service layer to handle the business logic (including validation specific) applied to the pet status data we acept on the platform.
 * @requires sequelize/lib/operators
 * @requires models/index
 */

// Import libraries needed by this service
const { Op } = require('sequelize')

// Import models used by this service
const { PetStatus } = require('../models')

/**
 * CRUD: Get one pet status by his id from database
 * @param {number} petStatusId - The id of the pet status you want to retrieve.
 * @returns {Object} An object "petStatus" that include the pet status data retrieved.
 * @example { id: 1, statusName: 'Available', statusDescription: 'The pet is available for adoption.' }
 * @throws {Object} An object "error" that include the error message and status code.
 * @example { status: 404, message: 'Can't find any pet status with id 1.' }
 */

const getOnePetStatus = async (petStatusId) => {
  try {
    const petStatus = await PetStatus.findByPk(petStatusId, {
      attributes: ['id', 'statusName', 'statusDescription']
    })
    if (!petStatus) {
      throw {
        status: 404,
        message: `Can't find any pet status with id ${petStatusId}.`
      }
    }
    return petStatus
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || 'Internal server error.'
    }
  }
}

/**
 * Get all pet statuses from database
 * @param {Object} filterParams - An object that can optionally include "statusName" as a parameter to filter the query to the database.
 * @example { statusName: 'Available for adoption' }
 * @returns {Object} An object "petStatuses" that include an array with all the pet statuses data retrieved.
 * @example { count: 2, rows: [ { id: 1, statusName: 'Available', statusDescription: 'The pet is available for adoption.' }, { id: 2, statusName: 'Adopted', statusDescription: 'The pet is already adopted.' } ] }
 * @throws {Object} An object "error" that include the error message and status code.
 * @example { status: 404, message: "Can't find any pet status." }
 */

const getAllPetStatuses = async (filterParams, orderParams) => {
  try {
    // Build filter statuses condition
    const { statusName } = filterParams
    const statusCondition = (statusName) ? { statusName: { [Op.like]: `%${statusName}%` } } : {}

    // Build order conditions (order field and order direction)
    const orderConditions = orderParams
      ? orderParams.map((order) => [order.field, order.direction])
      : [['id', 'ASC']]

    const petStatuses = await PetStatus.findAndCountAll({
      where: { ...statusCondition },
      attributes: ['id', 'statusName', 'statusDescription'],
      order: orderConditions
    })
    if (!petStatuses) {
      throw {
        status: 404,
        message: `Can't find any pet status with the given conditions ${JSON.stringify(filterParams)}.`
      }
    }
    return petStatuses
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || 'Internal server error.'
    }
  }
}

module.exports = {
  getOnePetStatus,
  getAllPetStatuses
}
