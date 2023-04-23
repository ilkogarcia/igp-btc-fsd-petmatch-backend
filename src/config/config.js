const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })

module.exports = {
  development: {
    database: process.env.MYSQL_DATABASE,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    dialect: process.env.MYSQL_DIALECT || 'mysql'
  },
  test: {
    database: process.env.MYSQL_DATABASE,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    dialect: process.env.MYSQL_DIALECT || 'mysql'
  },
  production: {
    database: process.env.MYSQL_DATABASE,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    dialect: process.env.MYSQL_DIALECT || 'mysql'
  }
}
