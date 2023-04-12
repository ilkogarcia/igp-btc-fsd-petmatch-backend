import { ORMConfig } from '../config/config.js'
import { Sequelize } from 'sequelize'
import * as dotenv from 'dotenv'
dotenv.config()

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE || ORMConfig.development.database,
  process.env.MYSQL_USER || ORMConfig.development.username,
  process.env.MYSQL_PASSWORD || ORMConfig.development.password,
  {
    host: process.env.MYSQL_HOST || ORMConfig.development.host,
    port: process.env.MYSQL_PORT || ORMConfig.development.port,
    dialect: process.env.MYSQL_DIALECT || ORMConfig.development.dialect,
    operatorAliases: false,
    pool: {
      max: 5, // maximum number of connection in pool
      min: 0, // minimum number of connection in pool
      acquire: 30000, // maximum time, in milliseconds, that a connection can be idle before being released
      idle: 10000 // maximum time, in milliseconds, that pool will try to get connection before throwing error
    }
  }
)

export const dbConnect = async () => {
  sequelize.authenticate()
    .then((db) => {
      console.log('MYSQL connected')
      return db
    })
    .catch((error) => console.log(error.message))
}

export default dbConnect
