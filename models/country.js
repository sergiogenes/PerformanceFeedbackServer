'use strict'
const { Model, DataTypes } = require('sequelize')
const db = require('../db')

class Country extends Model {}

Country.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ISO: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'countries',
  }
)
module.exports = Country
