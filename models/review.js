'use strict'
const { Model, DataTypes } = require('sequelize')
const db = require('../db')

class Review extends Model {}

Review.init(
  {
    idIndicator: {
      type: DataTypes.INTEGER,
    },
    indicator: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    goal: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    data: {
      type: DataTypes.INTEGER,
    },
    result: {
      type: DataTypes.INTEGER,
    },
    review: {
      type: DataTypes.TEXT,
    },
    date: {
      type: DataTypes.DATE,
    },
    period: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: db,
    modelName: 'reviews',
  }
)

Review.addHook('beforeCreate', review => {
  return (review.result = review.data - review.goal)
})

module.exports = Review
