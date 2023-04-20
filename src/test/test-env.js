// test-env.js
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
console.log('MYSQL_DATABASE:', process.env.MYSQL_DATABASE)
