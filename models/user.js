'use strict'

const { Model } = require('sequelize')
const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.User, { as: 'led', foreignKey: 'leaderId' })
      User.belongsTo(models.User, { as: 'leader', foreignKey: 'leaderId' })
      User.belongsTo(models.Position)
      User.belongsTo(models.Office)
      User.belongsTo(models.Team)
    }

    hash(password, salt) {
      return bcrypt.hash(password, salt)
    }

    validatePassword(password) {
      return this.hash(password, this.salt).then(hash => hash === this.password)
    }

    static findByEmail(email) {
      return User.findOne({ where: { email } })
    }

    static findByFileNumber(fileNumber) {
      return User.findOne({ where: { fileNumber } })
    }
  }

  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
      },
      fileNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          len: [4, 32],
        },
      },
      salt: {
        type: DataTypes.STRING,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      deactivated_at: {
        type: DataTypes.DATE,
      },
      shift: {
        type: DataTypes.ENUM('morning', 'afternoon', 'nigth'),
      },
    },
    {
      sequelize,
      tableName: 'users',
    }
  )

  User.addHook('beforeCreate', user => {
    user.password = user.fileNumber
    const salt = bcrypt.genSaltSync(9)
    user.salt = salt

    return user.hash(user.password, user.salt).then(hash => {
      user.password = hash
    })
  })

  User.beforeUpdate(user => {
    const salt = bcrypt.genSaltSync(9)
    user.salt = salt
    return user.hash(user.password, user.salt).then(hash => {
      user.password = hash
    })
  })

  return User
}
