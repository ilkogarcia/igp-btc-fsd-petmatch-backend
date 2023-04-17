const express = require('express')
const router = express.Router()
const isAuthenticated = require('../../middlewares/isAuthenticated')
const isAuthorized = require('../../middlewares/isAuthorized')
const PetController = require('../../controllers/petController')

// POST /api/v1/pets 
router.post('/', isAuthenticated, isAuthorized, PetController.createNewPet)

// GET /api/v1/pets/:petId
router.get('/:petId', isAuthenticated, isAuthorized, PetController.getOnePet)

// PUT /api/v1/pets/:petId
router.put('/:petId', isAuthenticated, isAuthorized, PetController.updateOnePet)

// DELETE /api/v1/pets/:petId
router.delete('/:petId', isAuthenticated, isAuthorized, PetController.deleteOnePet)

// GET /api/v1/pets
router.get('/', isAuthenticated, isAuthorized, PetController.getAllPets)

/**
* @openapi
* paths:
*  /api/v1/pets:
*    get:
*      summary: List all pets
*      operationId: listPets
*      tags:
*        - pets
*      responses:
*        '201':
*          description: A paged array of pets
*          content:
*            application/json:
*              schema:
*                type: object
*                properties:
*                  success:
*                    type: boolean
*                    example: true
*                  message:
*                    type: string
*                    example: All pets are listed
*                  data:
*                    type: array
*                    items:
*                       $ref: '#/components/schemas/Pet'
*        5XX:
*          description: FAILED
*          content:
*            application/json:
*              schema:
*                type: object
*                properties:
*                  success:
*                    type: boolen
*                    example: FAILED
*                  message:
*                    type: string
*                    example: Something has gone wrong
*  /api/v1/pets/{petId}:
*    get:
*      summary: Info for a specific pet
*      operationId: showPetById
*      tags:
*        - pets
*      parameters:
*        - name: petId
*          in: path
*          required: true
*          description: The id of the pet to retrieve
*          schema:
*            type: string
*      responses:
*        '201':
*          description: Expected response to a valid request
*          content:
*            application/json:
*              schema:
*                type: object
*                properties:
*                  success:
*                    type: boolean
*                    example: true
*                  message:
*                    type: string
*                    example: Info for a specific pet
*                  data:
*                    type: object
*                    item:
*                      $ref: '#/components/schemas/Pet'
*/

module.exports = router
