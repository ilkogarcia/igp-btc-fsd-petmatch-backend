require('dotenv').config()

const ORMConfig = {
  development: {
    database: process.env.MYSQL_DATABASE,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    dialect: process.env.MYSQL_DIALECT || 'mysql'
  },
  test: {
    database: 'database_development',
    username: 'root',
    password: null,
    host: '127.0.0.1',
    port: 3309,
    dialect: 'mysql'
  },
  production: {
    database: 'database_development',
    username: 'root',
    password: null,
    host: '127.0.0.1',
    port: 3309,
    dialect: 'mysql'
  }
}

module.exports = { ORMConfig }
