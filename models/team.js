'use strict'
const { Model, DataTypes } = require('sequelize')
const db = require('../db')

class Team extends Model {}

Team.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'teams',
  }
)

module.exports = Team
