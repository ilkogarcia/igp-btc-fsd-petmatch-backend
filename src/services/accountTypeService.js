/* eslint-disable no-throw-literal */
/**
 * @module services/accountTypeService
 * @description AccountType services
 * @requires sequelize/lib/operators
 * @requires models/index
 */

// Import dependencies
const { Op } = require('sequelize')

// Import models used by this service
const { AccountType } = require('../models/index')

/**
 * CRUD: Create a new accountType in database.
 * @param {Object} accountTypeData - The data for the account type to be created.
 * @param {String} accountTypeData.title - The title of the account type.
 * @param {String} accountTypeData.description - The description of the account type.
 * @param {String} accountTypeData.permissions - The permissions of the account type.
 * @param {Boolean} accountTypeData.isActive - The status of the account type.
 * @example accountTypeData = { title: 'administrator', description: 'Administrator account type', permissions: 'all', isActive: true }
 * @returns {Object} The created accountType data.
 */

const createNewAccountType = async (accountTypeData) => {
  try {
    const accountTypeAlreadyAdded = await AccountType.findOne({
      where: {
        title: accountTypeData.title
      }
    })
    if (accountTypeAlreadyAdded) {
      throw {
        status: 400,
        message: `An accountType with the title '${accountTypeData.title}' already exist.`
      }
    }
    const newAccountType = await AccountType.create(accountTypeData)
    return newAccountType
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || error
    }
  }
}

/**
 * CRUD: Retrieves an accountType by id.
 * @param {Number} accountTypeId  - The id of the accountType to retrieve.
 * @returns {Object} The retrieved accountType data.
 */

const getOneAccountType = async (accountTypeId) => {
  try {
    const accountType = await AccountType.findByPk(accountTypeId)
    if (!accountType) {
      throw {
        status: 400,
        message: `Can't find accountType with the id '${accountTypeId}'.`
      }
    }
    return accountType
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || error
    }
  }
}

/**
 * CRUD: Updates an accountType by id.
 * @param {Number} accountTypeId - The id of the accountType to update.
 * @param {Object} accountTypeData - The data for the accountType to be updated.
 * @returns {Object} The updated accountType data.
 */

const updateOneAccountType = async (accountTypeId, accountTypeData) => {
  try {
    const updateResult = await AccountType.update(accountTypeData, {
      where: { id: accountTypeId }
    })
    if (updateResult[0] === 0) {
      throw {
        status: 400,
        message: `Can't update the accountType with the id '${accountTypeId}'.`
      }
    }
    const accountType = await AccountType.findByPk(accountTypeId)
    return accountType
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || error
    }
  }
}

/**
 * CRUD: Deletes an accountType by id.
 * @param {Number} accountTypeId - The id of the accountType to delete.
 * @returns {Object} The deleted accountType data.
 */

const deleteOneAccountType = async (accountTypeId) => {
  try {
    const accountType = await AccountType.findByPk(accountTypeId)
    if (!accountType) {
      throw {
        status: 400,
        message: `Can't find accountType with the id '${accountTypeId}'.`
      }
    }
    await accountType.destroy({ where: { id: accountTypeId } })
    return accountType
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || error
    }
  }
}

/**
 * Get all accountTypes or accountTypes with filter params.
 * @param {Object} filterParams - An object that can optionally include "title, isActive" as a parameter to filter the query to the database.
 * @param {String} filterParams.title - The title of the accountType to retrieve.
 * @param {Boolean} filterParams.isActive - The status of the accountType to retrieve.
 * @example filterParams = { title: 'user', isActive: true }
 * @returns {Object} An object "accountTypes" that include and array with all the account types data retrieved.
 */

const getAllAccountTypes = async (filterParams) => {
  try {
    const { title, isActive } = filterParams

    // Build the conditions for the query
    const titleCondition = title ? { title: { [Op.like]: `${title}` } } : {}
    const isActiveCondition = isActive ? { isActive } : {}

    // Find all accountTypes usign the conditions already built
    const accountTypes = await AccountType.findAll({
      where: { ...titleCondition, ...isActiveCondition }
    })
    return accountTypes
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || error
    }
  }
}

/**
 * Find an accountType by title.
 * @param {String} title - The title of the accountType to retrieve.
 * @example title = 'user'
 * @returns {Object} An object "accountType" containing the accountType data.
 */

const findAccountTypeByTitle = async (title) => {
  try {
    const accountType = await AccountType.findOne({
      where: {
        title
      }
    })
    if (!accountType) {
      throw {
        status: 400,
        message: `Can't find accountType with the title '${title}'.`
      }
    }
    return accountType
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || error
    }
  }
}

module.exports = {
  createNewAccountType,
  getOneAccountType,
  updateOneAccountType,
  deleteOneAccountType,
  getAllAccountTypes,
  findAccountTypeByTitle
}
