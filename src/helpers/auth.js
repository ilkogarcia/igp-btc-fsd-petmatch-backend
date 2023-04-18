/*
 * Fefine the blacklist variable in a separate module and export it
 * so that it can be accessed in other modules.
 * 
 * Path: src/helpers/blacklist.js
*/

const { Set } = require('immutable')
const blacklist = new Set()

// Add token to blacklist
const addToBlacklist = (token) => {
  blacklist.add(token)
}

// Remove token from blacklist
const removeFromBlacklist = (token) => {
  blacklist.remove(token)
}

// Check if token is in blacklist
const isBlacklisted = (token) => {
  return blacklist.has(token)
}

module.exports = { 
  addToBlacklist, 
  removeFromBlacklist, 
  isBlacklisted
}