const S = require('sequelize')
const db = require('../db/index')

class Country extends S.Model {}

Country.init(
  {
    name: {
      type: S.STRING,
      allowNull: false,
    },
    ISO: {
      type: S.STRING,
      allowNull: false,
    },
  },
  { sequelize: db, modelName: 'country', timestamps: false }
)

module.exports = Country
