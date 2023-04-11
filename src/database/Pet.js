/*
* Database handle
*/

import DB from './db.js'

export class petDB {
  // Get all pets from DB
  static getAllPets = () => {
    return DB.pets
  }
}

export default petDB
