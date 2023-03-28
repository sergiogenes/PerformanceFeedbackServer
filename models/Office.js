const S = require('sequelize')
const db = require('../db/index')

class Office extends S.Model {}

Office.init(
  {
    name: {
      type: S.STRING,
      allowNull: false,
    },
  },
  { sequelize: db, modelName: 'office', timestamps: false }
)

module.exports = Office
