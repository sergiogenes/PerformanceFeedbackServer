'use strict'
const { Model, DataTypes } = require('sequelize')
const db = require('../db')

class Office extends Model {}

Office.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'offices',
  }
)

module.exports = Office
