/**
  * Service layer, responsible for returning reated data and 
  * not be responsible for sending the response to the client.
*/
const { Pet } = require('../models/index')

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
    if (!pet) {
      throw {
        status: 400,
        message: `Pet with the id '${petId}' was updated but for some reason we couldn't find the register.`
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
 * Retrieves all pets.
 * @returns {Array} An array of all pet data.
 */
const getAllPets = async (limit, offset) => {
  try {
    const pets = await Pet.findAndCountAll({
      limit: limit,
      offset: offset,
    })
    return {
      info: {
        count: pets.count,
        limit: limit,
        offset: offset,
      },
      data: {
        pets: pets.rows
      }
    }
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
