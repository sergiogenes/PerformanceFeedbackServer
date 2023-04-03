'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      // Category.hasMany(models.Indicator, { foreignKey: 'categoryId' })
      Category.hasMany(models.User, { foreignKey: 'categoryId' })
    }
  }
  Category.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      competence: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      function: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'categories',
    }
  )
  return Category
}
