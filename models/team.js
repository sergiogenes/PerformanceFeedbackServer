'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    static associate(models) {
      Team.hasMany(models.User, { foreignKey: 'userId' })
    }
  }
  Team.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'teams',
    }
  )
  return Team
}
