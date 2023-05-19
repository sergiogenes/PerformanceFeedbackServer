const Sequelize = require('sequelize')
require('dotenv').config()

const DB_URI = process.env.DEV_PD_URI

const db = new Sequelize(DB_URI, {
  dialectModule: require('pg'),
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
})

module.exports = db
