/**
  * Pet - Service layer. The methods on this case only are responsible
  * for return the created data and not be responsible for sending the
  * response to the client..
*/
const { Pet } = require('../models/index')

class PetService {
  /**
   * Creates a new pet in database.
   * @param {Object} petData - The data for the pet to be created.
   * @returns {Object} The created pet data.
   */
  static async createNewPet (petData) {
    try {
      const pet = await Pet.create(petData)
      return {
        success: true,
        message: `Pet added successfully with id: ${pet.id}`,
        data: { pet }
      }
    } catch (error) {
      throw new Error(`Something has gone wrong. Error: ${error?.message || 'Unknown error'}`)
    }
  }

  /**
   * Retrieves a pet by id.
   * @param {Number} petId - The id of the pet to retrieve.
   * @returns {Object} The retrieved pet data.
   */
  static async getOnePet (petId) {
    try {
      const pet = await Pet.findByPk(petId)
      if (!pet) {
        throw new Error(`No pet found with id: ${petId}`)
      }
      return pet
    } catch (error) {
      throw new Error(`Something has gone wrong. Error: ${error?.message || 'Unknown error'}`)
    }
  }

  /**
   * Updates a pet by id.
   * @param {Number} petId - The id of the pet to update.
   * @param {Object} petData - The data to update for the pet.
   * @returns {Object} The updated pet data.
   */
  static async updateOnePet (petId, petData) {
    try {
      const updateResult = await Pet.update(petData, {
        where: { id: petId }
      })
      if (updateResult[0] === 0) {
        throw new Error(`No pet found with id: ${petId}`)
      }
      const pet = await Pet.findByPk(petId)
      if (!pet) {
        throw new Error(`No pet found with id: ${petId}`)
      }
      return pet
    } catch (error) {
      throw new Error(`Something has gone wrong. ${error.message}`)
    }
  }

  /**
   * Deletes a pet by id.
   * @param {Number} petId - The id of the pet to delete.
   * @returns {Object} The deleted pet data.
   */
  static async deleteOnePet (petId) {
    try {
      const pet = await Pet.findByPk(petId)
      if (!pet) {
        throw new Error(`No pet found with id: ${petId}`)
      }
      await pet.destroy()
      return pet
    } catch (error) {
      throw new Error(`Something has gone wrong. Error: ${error?.message || 'Unknown error'}`)
    }
  }

  /**
   * Retrieves all pets.
   * @returns {Array} An array of all pet data.
   */
  static async getAllPets () {
    try {
      const pets = await Pet.findAll({
        order: [['id', 'DESC']]
      })
      return pets
    } catch (error) {
      throw new Error(`Something has gone wrong. Error: ${error?.message || 'Unknown error'}`)
    }
  }
}

module.exports = PetService
