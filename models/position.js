'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Position extends Model {
    static associate(models) {
      Position.hasMany(models.User, {
        foreignKey: 'positionId',
      })
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
      tableName: 'positions',
    }
  )
  return Position
}
