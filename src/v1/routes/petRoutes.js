import express from 'express'
import petController from '../../controllers/petController.js'

const router = express.Router()

// Create a new pet (CRUD: Create)
router.post('/', petController.createNewPet)

// Get an existing pet (CRUD: Retrive)
router.get('/:petId', petController.getOnePet)

// Update an existing pet (CRUD: Update)
router.put('/:petId', petController.updateOnePet)

// Delete and existing pet (CRUD: Delete)
router.delete('/:petId', petController.deleteOnePet)

// Get all existing pets
router.get('/', petController.getAllPets)

export default router
