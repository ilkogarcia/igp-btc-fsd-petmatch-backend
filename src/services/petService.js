/**
 * Pet service layer.
 * 
 * @module services/petService
 * @requires models/index
 * @requires sequelize/lib/operators
 */

const { Op } = require('sequelize')
const { Pet, PetSpecie, PetBreed, PetStatus } = require('../models/index')

/**
 * Creates a new pet in database.
 * @param {Object} petData - The data for the pet to be created.
 * @returns {Object} The created pet data.
 */

const createNewPet = async (petData) => {
  try {
    const petAlreadyAdded = await Pet.findOne({
      where: {
        specieId: petData.specieId,
        breedId: petData.breedId,
        shelterId: petData.shelterId,
        gender: petData.gender,
        name: petData.name,
        age: petData.age,
      }
    })
    if (petAlreadyAdded) {
      throw {
        status: 400,
        message: `A pet from that specie-breed with same name '${petData.name}' and age '${petData.age}' already exist on that shelter.`
      }
    }
    const newPet = await Pet.create(petData)
    return newPet
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || error
    }
  }
}

/**
 * Retrieves a pet by id.
 * @param {Number} petId - The id of the pet to retrieve.
 * @returns {Object} The retrieved pet data.
 */

const getOnePet = async (petId) => {
  try {
    const pet = await Pet.findByPk(petId)
    if (!pet) {
      throw {
        status: 400,
        message: `Can't find pet with the id '${petId}'.`
      }
    }
    return pet
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || error
    }
  }
}

/**
 * Updates a pet by id.
 * @param {Number} petId - The id of the pet to update.
 * @param {Object} petData - The data to update for the pet.
 * @returns {Object} The updated pet data.
 */

const updateOnePet = async (petId, petData) => {
  try {
    const updateResult = await Pet.update(petData, {
      where: { id: petId }
    })
    if (updateResult[0] === 0) {
      throw {
        status: 400,
        message: `Can't update pet with the id '${petId}'.`
      }
    }
    const pet = await Pet.findByPk(petId)
    return pet
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || error
    }
  }
}

/**
 * Deletes a pet by id.
 * @param {Number} petId - The id of the pet to delete.
 * @returns {Object} The deleted pet data.
 */

const deleteOnePet = async (petId) => {
  try {
    const pet = await Pet.findByPk(petId)
    if (!pet) {
      throw {
        status: 400,
        message: `Can't find pet with the id '${petId}'.`
      }
    }
    const deleteResult = await pet.destroy()
    if (deleteResult[0] === 0) {
      throw {
        status: 400,
        message: `Pet with the id '${petId}' was found but for some reason we couldn't delete.`
      }
    }

    return pet
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || error
    }
  }
}

/**
 * Retrieves all pets with the filter params and order params.
 * @param {Number} limit - The limit of pets to retrieve.
 * @param {Number} offset - The offset of pets to retrieve.
 * @param {Object} filterParams - An object that contain all filters params to be used in the query.
 * @param {Array} orderParams - Array of objects that contain two properties fild and direction to be used in order query.
 * @returns {Object} The retrieved pets data.
 * @returns {Number} The count of all pets with the filter params and order params.
 */

const getAllPets = async (limit, offset, filterParams, orderParams) => {
  const { speciesName, breedName, petGender, petStatus, minAge, maxAge } = filterParams
  
  // Conditions to be used in the query
  const speciesCondition = (speciesName) ? { specieCommonName : { [Op.like]: `${speciesName}` }} : {}
  const breedCondition = (breedName) ? { breedName : { [Op.like]: `${breedName}` }} : {}
  const genderCondition = petGender ? { gender : { [Op.like]: `${petGender}`}} : {}
  const statusCondition = (petStatus) ? { statusName : { [Op.like]: `${petStatus}` }} : {}
  const ageConditions = (minAge && maxAge)? { age : { [Op.between]: [minAge, maxAge] }} : {}

  // Order conditions to be used in the query
  const orderConditions = orderParams
    ? orderParams.map((order) => [order.field, order.direction])
    : [['id', 'ASC']]

  try {
    // Find all pets with the conditions and order, and return the count
    const pets = await Pet.findAndCountAll({
      where: { ...genderCondition, ...ageConditions },
      include: [
        { model: PetBreed,
          where: { ...breedCondition },
          required: true,
            include: [
              { model: PetSpecie,
                where: { ...speciesCondition },
                required: true,
              }],
        },
        { model: PetStatus,
          where: { ...statusCondition },
          required: true,
        }],
      limit: limit,
      offset: offset,
      order: orderConditions,
    })
    return pets  
  } catch (error) {
    throw { status: 500, message: error }
  }
}

module.exports = {
  createNewPet,
  getOnePet,
  updateOnePet,
  deleteOnePet,
  getAllPets
}
