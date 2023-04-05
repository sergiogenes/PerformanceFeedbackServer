'use strict'

const { Model } = require('sequelize')
const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static init() {
      const schema = {
        firstName: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
        lastName: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            isEmail: true,
          },
        },
        image: {
          type: DataTypes.STRING,
        },
        fileNumber: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            notEmpty: true,
          },
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            isStrongPassword: {
              minLength: 2,
              minLowercase: 0,
              minUppercase: 0,
              minNumbers: 0,
              minSymbols: 0,
            },
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
          defaultValue: 'morning',
        },
      }

      const hooks = {
        afterValidate: user => {
          const salt = bcrypt.genSaltSync()
          user.salt = salt
          return user.hash(user.password, salt).then(hash => {
            user.password = hash
          })
        },
      }

      return super.init(schema, {
        hooks,
        sequelize,
        tableName: 'users',
      })
    }

    static associate(models) {
      User.hasMany(models.Review, { foreignKey: 'evaluatedId' })
      User.hasMany(models.Review, { foreignKey: 'evaluatorId' })
      User.hasMany(models.User, { as: 'led', foreignKey: 'leaderId' })
      User.belongsTo(models.User, { as: 'leader', foreignKey: 'leaderId' })
      User.belongsTo(models.Position, { foreignKey: 'positionId' })
      User.belongsTo(models.Office, { foreignKey: 'officeId' })
      User.belongsTo(models.Team, { foreignKey: 'teamId' })
      User.belongsTo(models.Category, { foreignKey: 'categoryId' })
    }

    static findByEmail(email) {
      return User.findOne({ where: { email } })
    }

    static findByFileNumber(fileNumber) {
      return User.findOne({ where: { fileNumber } })
    }

    hash(password, salt) {
      return bcrypt.hash(password, salt)
    }

    hasPassword(stringToValidate) {
      return this.hash(stringToValidate, this.salt).then(
        newHash => newHash === this.password
      )
    }

    // See nonybrighto's comment in https://stackoverflow.com/a/48357983/8706387
    toJSON() {
      const userForClient = this.get({ clone: true })
      ;['password', 'salt'].forEach(key => delete userForClient[key])
      return userForClient
    }
  }

  User.init({
    sequelize,
    tableName: 'users',
  })

  return User
}
