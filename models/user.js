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
        beforeCreate: user => {
          const salt = bcrypt.genSaltSync()
          user.salt = salt
          return user.hash(user.password, salt).then(hash => {
            user.password = hash
          })
        },
        beforeUpdate: user => {
          const salt = bcrypt.genSaltSync(9)
          user.salt = salt
          return user.hash(user.password, user.salt).then(hash => {
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
      User.belongsTo(models.Position, {
        as: 'position',
        foreignKey: 'positionId',
      })
      User.belongsTo(models.Office, { foreignKey: 'officeId' })
      User.belongsTo(models.Team, { foreignKey: 'teamId' })
      User.belongsTo(models.Category, { foreignKey: 'categoryId' })
    }

    static async withCredentialsDoIfNone(
      email,
      password,
      foundClosure,
      noneClosure
    ) {
      return await this.findOneDoIfNone(
        { where: { email } },
        async user => {
          if (!(await user.hasPassword(password))) return noneClosure()

          return foundClosure(user)
        },
        noneClosure
      )
    }

    static findByFileNumber(fileNumber) {
      return User.findOne({ where: { fileNumber } })
    }

    static async findOneDoIfNone(options, foundClosure, noneClosure) {
      const foundUser = await this.findOne(options)
      if (!foundUser) return noneClosure()

      return await foundClosure(foundUser)
    }

    hash(password, salt) {
      return bcrypt.hash(password, salt)
    }

    async hasPassword(stringToValidate) {
      const hashed = await this.hash(stringToValidate, this.salt)
      return hashed === this.password
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
