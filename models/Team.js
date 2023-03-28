const S = require('sequelize')
const db = require('../db/index')

class Team extends S.Model {}

Team.init(
  {
    name: {
      type: S.STRING,
      allowNull: false,
    },
  },
  { sequelize: db, modelName: 'team', timestamps: false }
)

module.exports = Team
