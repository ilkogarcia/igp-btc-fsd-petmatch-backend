/**
 * AccountType service layer.
 * 
 * @module services/accountTypeService
 * @requires sequelize/lib/operators
 * @requires models/index
 */

const { Op } = require('sequelize')
const { AccountType } = require('../models/index')

/**
 * Creates a new accountType in database.
 * @param {Object} accountTypeData - The data for the accountType to be created.
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
 * Retrieves an accountType by id.
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
 * Updates an accountType by id.
 * @param {Number} accountTypeId - The id of the accountType to update.
 * @param {Object} accountTypeData - The data for the accountType to be updated.
 * @returns {Object} The updated accountType data.
 */

const updateOneAccountType = async (accountTypeId, accountTypeData) => {
  try {
    const updateResult = await AccountType.update(accountTypeData, {
      where: { id: accountTypeId }
    })
    if (updateResult[0] === 0 ) {
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
 * Deletes an accountType by id.
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
 * Retrieves all accountTypes.
 * @param {Object} filterParams - The filter params for the accountTypes to retrieve.
 * @returns {Array} The list of retrieved accountTypes data.
 */

const getAllAccountTypes = async (filterParams) => {
  try {
    const { title, isActive } = filterParams

    // Conditions for the query
    const titleCondition = title ? { title: { [Op.like]: `${title}` } } : {}
    const isActiveCondition = isActive ? { isActive: isActive } : {}

    // Find all accountTypes with the conditions
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

const findAccountTypeByTitle = async (title) => {
  try {
    const accountType = await AccountType.findOne({
      where: {
        title: title
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
