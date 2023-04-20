/* eslint-disable no-throw-literal */
/**
 * @module service/applicationStatusService
 * @description Service layer to handle the business logic (including validation specific) applied to the pet status data we acept on the platform.
 * @requires sequelize/lib/operators
 * @requires models/index
 */

// Import libraries needed by this service
const { Op } = require('sequelize')

// Import models used by this service
const { ApplicationStatus } = require('../models')

/**
 * CRUD: Get one application status by his id from database
 * @param {number} applicationStatusId - The id of the application status you want to retrieve.
 * @example { applicationStatusId: 1}
 * @returns {Object} An object "applicationStatus" that include the application status data retrieved.
 * @example { id: 1, statusName: 'Pending', statusDescription: 'The application is pending.' }
 * @throws {Object} An object "error" that include the error message and status code.
 */

const getOneApplicationStatus = async (applicationStatusId) => {
  try {
    const applicationStatus = await ApplicationStatus.findByPk(applicationStatusId, {
      attributes: ['id', 'statusName', 'statusDescription']
    })
    if (!applicationStatus) {
      throw {
        status: 404,
        message: `Can't find any pet status with id ${applicationStatusId}.`
      }
    }
    return applicationStatus
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || 'Internal server error.'
    }
  }
}

/**
 * Get all application statuses from database
 * @param {Object} filterParams - An object that can optionally include "statusName" as a parameter to filter the query to the database.
 * @example { statusName: 'Cancelled' }
 * @returns {Object} An object "ApplicationStatuses" that include an array with all the application statuses data retrieved.
 * @example { count: 3, rows: [ { id: 1, statusName: 'Pending', statusDescription: 'The application is pending.' }, { id: 2, statusName: 'Accepted', statusDescription: 'The application has been accepted.' }, { id: 3, statusName: 'Cancelled', statusDescription: 'The application has been cancelled.' } ] }
 * @throws {Object} An object "error" that include the error message and status code.
 * @example { status: 404, message: "Can't find any pet status." }
 */

const getAllApplicationStatuses = async (filterParams, orderParams) => {
  try {
    // Build filter statuses condition
    const { statusName } = filterParams
    const statusCondition = (statusName) ? { statusName: { [Op.like]: `%${statusName}%` } } : {}

    // Build order conditions (order field and order direction)
    const orderConditions = orderParams
      ? orderParams.map((order) => [order.field, order.direction])
      : [['id', 'ASC']]

    const applicationStatuses = await ApplicationStatus.findAndCountAll({
      where: { ...statusCondition },
      attributes: ['id', 'statusName', 'statusDescription'],
      order: orderConditions
    })
    if (!applicationStatuses) {
      throw {
        status: 404,
        message: `Can't find any application status with the given conditions ${JSON.stringify(filterParams)}.`
      }
    }
    return applicationStatuses
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || 'Internal server error.'
    }
  }
}

module.exports = {
  getOneApplicationStatus,
  getAllApplicationStatuses
}
