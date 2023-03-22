const Sequelize = require("sequelize");

const connectionConfigurations = require('./config')

const environment = process.env.NODE_ENV || 'development'
const selectedConfiguration = connectionConfigurations[environment]
const { database, username, password } = selectedConfiguration

const sequelize = new Sequelize(
  database,
  username,
  password,
  selectedConfiguration
)

module.exports = sequelize
