const S = require('sequelize')
const db = require('../db/index')

class Position extends S.Model {}

Position.init(
  {
    name: {
      type: S.STRING,
      allowNull: false,
    },
  },
  { sequelize: db, modelName: 'position', timestamps: false }
)

module.exports = Position
