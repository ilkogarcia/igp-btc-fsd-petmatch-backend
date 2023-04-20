/* eslint-disable no-throw-literal */
/**
 * @module services/userPetService
 * @description This module is responsible for handling the business logic of the user pet endpoints.
 * @requires models/index
 * @requires models/userPet
 * @requires models/user
 * @requires models/pet
 * @requires models/petSpecie
 * @requires models/petBreed
 * @requires models/petStatus
 */

// Import models used by this service
const { UserPet, User, Pet, PetSpecie, PetBreed, PetStatus } = require('../models')

/**
 * Get all user pets from database
 * @param {Number} limit - The number of user pets to retrieve.
 * @param {Number} offset - The number of user pets to skip.
 * @param {Object} filterParams - An object that can optionally include "petId" and "userId" as parameters to filter the query to the database.
 * @returns {Object} An object "userPets" that include an array with all the user pets data retrieved.
 * @example { count: 2, rows: [ { id: 1, petId: 1, userId: 1, adoptionDate: '2021-01-01' }, { id: 2, petId: 1, userId: 2, adoptionDate: '2021-01-02' } ] }
 * @throws {Object} An object "error" that include the error message and status code.
 * @example { status: 404, message: "Can't find any user pet." }
 */

const getAllUserPets = async (limit, offset, filterParams, orderParams) => {
  try {
    const { userId, petId, isFavorite, isSaved, isLiked } = filterParams
    const userCondition = (userId) ? { userId } : {}
    const petCondition = (petId) ? { petId } : {}
    const favoriteCondition = (isFavorite) ? { myFavorite: (isFavorite === 'Ok') } : {}
    const savedCondition = (isSaved) ? { isSaved: (isSaved === 'Ok') } : {}
    const likedCondition = (isLiked) ? { hasLike: (isLiked === 'Ok') } : {}

    const orderConditions = (orderParams)
      ? orderParams.map((order) => [order.field, order.direction])
      : [['id', 'ASC']]

    console.log('Antes del findAll', offset, limit)
    const userPets = await UserPet.findAndCountAll({
      where: { ...userCondition, ...petCondition, ...favoriteCondition, ...savedCondition, ...likedCondition },
      include: [
        {
          model: User,
          attributes: ['username']
        },
        {
          model: Pet,
          attributes: ['name', 'age', 'gender', 'description'],
          include: [
            {
              model: PetSpecie,
              attributes: ['specieCommonName']
            },
            {
              model: PetBreed,
              attributes: ['breedName']
            },
            {
              model: PetStatus,
              attributes: ['statusName']
            }
          ]
        }
      ],
      limit,
      offset,
      order: orderConditions
    })

    if (!userPets) {
      throw {
        status: 404,
        message: "Can't find any user pet."
      }
    }
    return userPets
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || 'Internal server error.'
    }
  }
}

const getAllPetsLikes = async (userId) => {
  try {
    const likedPets = await UserPet.findAndCountAll({
      where: { userId, hasLike: true },
      include: [
        {
          model: Pet,
          attributes: ['name', 'age', 'gender'],
          include: [
            {
              model: PetBreed,
              attributes: ['breedName'],
              include: [
                {
                  model: PetSpecie,
                  attributes: ['specieCommonName']
                }]
            },
            {
              model: PetStatus,
              attributes: ['statusName']
            }]
        }]
    })
    return likedPets
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || 'Internal server error.'
    }
  }
}

const getAllPetsSaved = async (userId) => {
  try {
    const savedPets = await UserPet.findAndCountAll({
      where: { userId, isSaved: true },
      include: [
        {
          model: Pet,
          attributes: ['name', 'age', 'gender'],
          include: [
            {
              model: PetBreed,
              attributes: ['breedName'],
              include: [
                {
                  model: PetSpecie,
                  attributes: ['specieCommonName']
                }]
            },
            {
              model: PetStatus,
              attributes: ['statusName']
            }]
        }]
    })
    return savedPets
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || 'Internal server error.'
    }
  }
}

const getAllPetsFavorites = async (userId) => {
  try {
    const favoritePets = await UserPet.findAndCountAll({
      where: { userId, myFavorite: true },
      include: [
        {
          model: Pet,
          attributes: ['name', 'age', 'gender'],
          include: [
            {
              model: PetBreed,
              attributes: ['breedName'],
              include: [
                {
                  model: PetSpecie,
                  attributes: ['specieCommonName']
                }]
            },
            {
              model: PetStatus,
              attributes: ['statusName']
            }]
        }]
    })
    return favoritePets
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || 'Internal server error.'
    }
  }
}

module.exports = {
  getAllUserPets,
  getAllPetsLikes,
  getAllPetsSaved,
  getAllPetsFavorites
}
