'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Indicator extends Model {
    static associate(models) {
      Indicator.belongsTo(models.Category, { foreignKey: 'categoryId' })
    }
  }
  Indicator.init(
    {
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      goal: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'indicators',
    }
  )
  return Indicator
}
