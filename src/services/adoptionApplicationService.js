/* eslint-disable no-throw-literal */
/* eslint-disable no-useless-catch */
/**
 * @module services/adoptionApplicationService
 * @description Adoption Application service.
 */

// Import dependencies used by this service
const { Op } = require('sequelize')

// Import models used by this service
const { AdoptionApplication } = require('../models/index')

/**
 * @function createNewAdoptionApplication - CRUD: Create a new adoption application in database.
 * @param {object} adoptionApplicationData - Adoption application data.
 * @returns {object} - Returns an object with the new adoption application data.
 */

const createNewAdoptionApplication = async (adoptionApplicationData) => {
  try {
    const adoptionApplication = await AdoptionApplication.create(adoptionApplicationData)
    return adoptionApplication
  } catch (error) {
    throw error
  }
}

/**
 * @function getOneAdoptionApplication - CRUD: Retrieves an adoption application by id.
 * @param {Number} adoptionApplicationId - Adoption application id.
 * @returns {Object} - Returns an object with the adoption application data.
 */

const getOneAdoptionApplication = async (adoptionApplicationId) => {
  try {
    const adoptionApplication = await AdoptionApplication.findByPk(adoptionApplicationId)
    if (!adoptionApplication) {
      throw {
        status: 400,
        message: `Adoption application with id '${adoptionApplicationId}' does not exist.`
      }
    }
    return adoptionApplication
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || error
    }
  }
}

const getAllAdoptionApplications = async (limit, offset, filterParams, orderParams) => {
  try {
    // Desctructure filter parameters to get the values
    const {
      user,
      pet,
      shelter,
      status,
      applicationBetween,
      approvalBetween,
      rejectionBetween
    } = filterParams

    // Build conditions object to be used in the where clause
    const userCondition = (user) ? { userId: { [Op.eq]: user } } : {}

    // Order conditions to be used in the query
    const orderConditions = (orderParams)
      ? orderParams.map((order) => [order.field, order.direction])
      : [['id', 'ASC']]

    // Get all adoption applications from the database
    const adoptionApplications = await AdoptionApplication.findAndCountAll({
      where: { ...userCondition },
      limit,
      offset,
      order: orderConditions
    })
    return adoptionApplications
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || 'Internal server error.'
    }
  }
}

module.exports = {
  createNewAdoptionApplication,
  getOneAdoptionApplication,
  getAllAdoptionApplications
}
