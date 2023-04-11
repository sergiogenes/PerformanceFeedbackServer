'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      Review.belongsTo(models.User, {
        as: 'evaluated',
        foreignKey: 'evaluatedId',
      })
      Review.belongsTo(models.User, {
        as: 'evaluator',
        foreignKey: 'evaluatorId',
      })
    }
  }
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
      sequelize,
      tableName: 'reviews',
    }
  )

  Review.addHook('beforeCreate', review => {
    return (review.result = review.data - review.goal)
  })

  return Review
}
