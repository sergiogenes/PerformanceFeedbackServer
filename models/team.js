'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    static associate(models) {
      Team.hasMany(models.User, { foreignKey: 'teamId' })
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
      // modelName: 'team',
    }
  )
  return Team
}
