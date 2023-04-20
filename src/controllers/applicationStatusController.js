/**
 * @module controllers/applicationStatusController
 * @description Receive requests and responsible for calling the service layer and returning the response to the client.
 */

// Import services used on this controller
const ApplicationStatusService = require('../services/applicationStatusService')
/**
 * CRUD: Get one application status by his id using the service layer
 * @param {Object} req - An object that includes the id of the application status you want to retrieve.
 * @example {applicationStatusId: 5}
 * @param {Object} res - An object in JSON format that includes all data retrived.
 * @example { id: 5, statusName: 'Pending', statusDescription: 'The application is pending.' }
 * @throws {Object} An object "error" that include the error message and status code.
 * @example { status: 404, message: "Can't find any application status with this id: 5." }
 */

const getOneApplicationStatus = async (req, res) => {
  try {
    const { params: { applicationStatusId } } = req
    const applicationStatus = await ApplicationStatusService.getOneApplicationStatus(applicationStatusId)
    if (!applicationStatus) {
      return res.status(404).json({
        sucess: false,
        message: `Can't find any application status with this id: ${applicationStatusId}.`
      })
    }
    return res.status(201).json({
      sucess: true,
      message: 'Application status info recovered successfully.',
      data: {
        applicationStatus
      }
    })
  } catch (error) {
    return res.status(error?.status || 500).json({
      sucess: false,
      message: error?.message || 'Internal server error.'
    })
  }
}

/**
 * Get all application statuses using the service layer
 * @param {Object} req - An object containing "statusName" as a filter parameters to be used in the query.
 * @example { statusName: 'Cancelled' }
 * @returns {Object} res - An object in JSON format that includes all data retrieved.
 * @example { count: 3, rows: [ { id: 1, statusName: 'Pending', statusDescription: 'The application is pending.' }, { id: 2, statusName: 'Accepted', statusDescription: 'The application has been accepted.' }, { id: 3, statusName: 'Cancelled', statusDescription: 'The application has been cancelled.' } ] }
 * @throws {Object} An object "error" that include the error message and status code.
 * @example { status: 404, message: "Can't find any pet status." }
 */

const getAllApplicationStatuses = async (req, res) => {
  try {
    const { filterParams } = req.body
    const { orderParams } = req.body
    const applicationStatuses = await ApplicationStatusService.getAllApplicationStatuses(filterParams, orderParams)
    if (!applicationStatuses) {
      return res.status(404).json({
        sucess: false,
        message: `Can't find any application status with this filter: ${filterParams}.`
      })
    }
    return res.status(201).json({
      sucess: true,
      message: `Recovered successfully ${applicationStatuses.count} application status(es).`,
      info: {
        total: applicationStatuses.count
      },
      data: {
        applicationStatuses: applicationStatuses.rows || []
      }
    })
  } catch (error) {
    return res.status(error?.status || 500).json({
      sucess: false,
      message: error?.message || 'Internal server error.'
    })
  }
}

module.exports = {
  getOneApplicationStatus,
  getAllApplicationStatuses
}
