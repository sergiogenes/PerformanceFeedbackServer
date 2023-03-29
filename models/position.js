'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Position extends Model {
    static associate(models) {
      Position.hasMany(models.User)
    }
  }
  Position.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'position',
    }
  )
  return Position
}
