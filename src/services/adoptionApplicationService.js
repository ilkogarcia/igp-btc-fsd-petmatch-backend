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
 * @function createNewAdoptionApplication - CRUD: Create a new adoption application.
 * @param {Object} newAdoptionApplication - Adoption application data.
 * @example newAdoptionApplication = { userId: 1, petId: 1, shelterId: 1, statusId: 1, applicationDate: '2021-01-01', approvalDate: '2021-01-01', rejectionDate: '2021-01-01', createdAt: '2021-01-01', updatedAt: '2021-01-01', applicationNotes: 'This is a note.' }
 * @returns {Object} adoptionApplication - Returns an object with the adoption application data.
 */

const createNewAdoptionApplication = async (newAdoptionApplication) => {
  try {
    // Check if the adoption application already exists for the same user and pet
    const adoptionApplicationAlreadyAdded = await AdoptionApplication.findOne({
      where: {
        userId: newAdoptionApplication.userId,
        petId: newAdoptionApplication.petId
      }
    })
    if (adoptionApplicationAlreadyAdded) {
      throw {
        status: 400,
        message: `An adoption application for the user with id '${newAdoptionApplication.userId}' and pet with id '${newAdoptionApplication.petId}' already exists.`
      }
    }
    // Create the new adoption application
    const adoptionApplication = await AdoptionApplication.create(newAdoptionApplication)
    if (!adoptionApplication) {
      throw {
        status: 400,
        message: `Something went wrong while creating the adoption application for the user with id '${newAdoptionApplication.userId}' and pet with id '${newAdoptionApplication.petId}'.`
      }
    }

    return adoptionApplication
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || 'Internal server error.'
    }
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
      message: error?.message || 'Internal server error.'
    }
  }
}

/**
 * @function updateOneAdoptionApplication - CRUD: Updates an adoption application.
 * @param {Number} adoptionApplicationId - Adoption application id.
 * @param {Object} adoptionApplicationData - Adoption application data.
 * @example adoptionApplicationData = { statusId: 3, approvalDate: '2021-01-01', applicationNotes: 'Status change comments.' }
 * @returns {Object} adoptionApplication - Returns an object with the adoption application data.
 */

const updateOneAdoptionApplication = async (userId, adoptionApplicationId, adoptionApplicationData) => {
  try {
    // Find the adoption application
    const adoptionApplication = await AdoptionApplication.findOne({
      where: { id: adoptionApplicationId, userId }
    })
    if (!adoptionApplication) {
      throw {
        status: 400,
        message: `Adoption application with id '${adoptionApplicationId}' does not exist or user with id '${userId}' does not have permission to update this adoption application.`
      }
    }

    // If everything is ok, update the adoption application
    const updatedAdoptionApplication = await adoptionApplication.update(adoptionApplicationData)
    if (!updatedAdoptionApplication) {
      throw {
        status: 400,
        message: `Adoption application with id '${adoptionApplicationId}' could not be updated.`
      }
    }

    return updatedAdoptionApplication
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || 'Internal server error.'
    }
  }
}

/**
 * @function deleteOneAdoptionApplication - CRUD: Deletes an adoption application.
 * @param {Object} userId - User id of the user who is deleting the adoption application.
 * @param {*} adoptionApplicationId - Adoption application id.
 * @returns {Object} adoptionApplication - Returns an object with the deleted adoption application data.
 */

const deleteOneAdoptionApplication = async (userId, adoptionApplicationId) => {
  try {
    // Find the adoption application
    const adoptionApplication = await AdoptionApplication.findOne({
      where: { id: adoptionApplicationId, userId }
    })
    if (!adoptionApplication) {
      throw {
        status: 400,
        message: `Adoption application with id '${adoptionApplicationId}' does not exist or user with id '${userId}' does not have permission to update this adoption application.`
      }
    }

    // If everything is ok, delete the adoption application
    const deleteResult = await adoptionApplication.destroy()
    if (!deleteResult) {
      throw {
        status: 400,
        message: `Adoption application with id '${adoptionApplicationId}' could not be deleted.`
      }
    }

    return adoptionApplication
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || 'Internal server error.'
    }
  }
}

/**
 * @function getAllAdoptionApplications - CRUD: Retrieves all adoption applications.
 * @param {Number} limit - Limit the number of results.
 * @param {Number} offset - Offset the number of results.
 * @param {Object} filterParams - Filter parameters.
 * @example filterParams = { user: 1, pet: 1, shelter: 1, status: 1, applicationBetween: ['2021-01-01', '2021-01-01'], approvalBetween: ['2021-01-01', '2021-01-01'], rejectionBetween: ['2021-01-01', '2021-01-01'] }
 * @param {Object} orderParams - Order parameters.
 * @example orderParams = [{ field: 'id', direction: 'ASC' }]
 * @returns {Object} adoptionApplications - Returns an object with the adoption applications data.
 */

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
  updateOneAdoptionApplication,
  deleteOneAdoptionApplication,
  getAllAdoptionApplications
}
