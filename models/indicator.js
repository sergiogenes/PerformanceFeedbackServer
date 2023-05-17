'use strict'
const { Model, DataTypes } = require('sequelize')
const db = require('../db')

class Indicator extends Model {}
Indicator.init(
  {
    description: {
      type: DataTypes.TEXT,
      // allowNull: false,
    },
    goal: {
      type: DataTypes.INTEGER,
      // allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'indicators',
  }
)
module.exports = Indicator
