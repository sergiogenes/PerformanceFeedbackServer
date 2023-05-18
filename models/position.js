'use strict'
const { Model, DataTypes } = require('sequelize')
const db = require('../db')

class Position extends Model {}

Position.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'positions',
  }
)

module.exports = Position
