'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Office extends Model {
    static associate(models) {
      Office.belongsTo(models.Country)
      Office.hasMany(models.User)
    }
  }
  Office.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'offices',
    }
  )
  return Office
}
