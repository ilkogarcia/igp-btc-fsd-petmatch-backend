import express from 'express'
import petController from '../../controllers/petController.js'

const router = express.Router()

router
  .post('/', petController.createNewPet)
  .get('/:petId', petController.getOnePet)
  .put('/:petId', petController.updateOnePet)
  .delete('/:petId', petController.deleteOnePet)
  .get('/', petController.getAllPets)

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

export default router
