/**
 * @module src/controllers/userPetController
 * @description This module is responsible for handling all requests related to user pets.
 * @requires src/services/userPetService
 */

// Import services modules used by this controller
const UserPetService = require('../services/userPetService')

/**
 * Get all user pets from database
 * @param {Object} req - An object that includes the request parameters.
 * @param {Object} res - An object that includes the response parameters.
 */

const getAllUserPets = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5
    const page = parseInt(req.query.page) || 1
    const offset = (page - 1) * limit

    if (limit <= 0 || page <= 0) {
      return res.status(400).json({
        status: false,
        message: 'Pagination parameters \'limit\' and \'page\' have to be greater than 0.'
      })
    }

    const { filterParams } = req.body
    const { orderParams } = req.body

    const userPets = await UserPetService.getAllUserPets(limit, offset, filterParams, orderParams)
    if (!userPets) {
      return res.status(404).json({
        sucess: false,
        message: 'In this moment we can\'t find any relations between users and pets.'
      })
    }
    return res.status(201).json({
      sucess: true,
      message: 'Some users and pets were found successfully.',
      info: {
        total: userPets.count,
        limit,
        page,
        offset
      },
      data: {
        userPets: userPets.rows || []
      }
    })
  } catch (error) {
    return res.status(error?.status || 500).json({
      sucess: false,
      message: error?.message || 'Internal server error.',
      data: error
    })
  }
}

const getAllPetsLikes = async (req, res) => {
  try {
    const likedPets = await UserPetService.getAllPetsLikes(req.userId)
    if (!likedPets) {
      return res.status(404).json({
        sucess: false,
        message: 'The list of pets with a user\'s like is empty'
      })
    }
    return res.status(201).json({
      sucess: true,
      message: 'The list of pets with a user like has been successfully retrieved',
      info: {
        total: likedPets.count
      },
      data: {
        pets: likedPets || []
      }
    })
  } catch (error) {
    return res.status(error?.status || 500).json({
      sucess: false,
      message: error?.message || 'Unknow error',
      data: error
    })
  }
}

const getAllPetsSaved = async (req, res) => {
  try {
    const savedPets = await UserPetService.getAllPetsSaved(req.userId)
    if (!savedPets) {
      return res.status(404).json({
        sucess: false,
        message: 'The list of pets user has saved for later is empty.'
      })
    }
    return res.status(201).json({
      sucess: true,
      message: 'The list of pets user has saved for later has been successfully retrieved.',
      info: {
        total: savedPets.count
      },
      data: {
        pets: savedPets || []
      }
    })
  } catch (error) {
    return res.status(error?.status || 500).json({
      sucess: false,
      message: error?.message || 'Unknow error',
      data: error
    })
  }
}

const getAllPetsFavorites = async (req, res) => {
  try {
    const favoritePets = await UserPetService.getAllPetsFavorites(req.userId)
    if (!favoritePets) {
      return res.status(404).json({
        sucess: false,
        message: 'The list of pets user has favorited is empty.'
      })
    }
    return res.status(201).json({
      sucess: true,
      message: 'The list of pets user has favorited has been successfully retrieved.',
      info: {
        total: favoritePets.count
      },
      data: {
        pets: favoritePets || []
      }
    })
  } catch (error) {
    return res.status(error?.status || 500).json({
      sucess: false,
      message: error?.message || 'Unknow error',
      data: error
    })
  }
}

module.exports = {
  getAllUserPets,
  getAllPetsLikes,
  getAllPetsSaved,
  getAllPetsFavorites
}
