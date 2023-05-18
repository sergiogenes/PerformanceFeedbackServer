'use strict'
const { Model, DataTypes } = require('sequelize')
const db = require('../db')

class Category extends Model {}

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
    sequelize: db,
    modelName: 'categories',
  }
)
module.exports = Category
