'use strict'

const { Model, DataTypes } = require('sequelize')
const bcrypt = require('bcrypt')
const db = require('../db')

class User extends Model {
  static async withEmailAndPasswordDoIfNone(
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

  static async findByFileNumber(fileNumber) {
    return await User.findOne({ where: { fileNumber } })
  }

  static async findOneDoIfNone(options, foundClosure, noneClosure) {
    const foundUser = await this.findOne(options)
    if (!foundUser) return noneClosure()

    return await foundClosure(foundUser)
  }

  isRoot() {
    return this.id === 1
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

User.init(
  {
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
      set(aBoolean) {
        if (this.isRoot())
          return console.log('Attempt to demote the root user.')

        this.setDataValue('isAdmin', aBoolean)
      },
    },
    deactivated_at: {
      type: DataTypes.DATE,
      set(aDate) {
        if (this.isRoot()) return console.log('Attempt to deactivate root user')

        this.setDataValue('deactivated_at', aDate)
      },
    },
    shift: {
      type: DataTypes.ENUM('morning', 'afternoon', 'night'),
      defaultValue: 'morning',
    },
  },
  {
    sequelize: db,
    modelName: 'users',
  }
)

User.addHook('beforeCreate', user => {
  const salt = bcrypt.genSaltSync()
  user.salt = salt
  user.image = `https://api.multiavatar.com/${user.fileNumber}.svg`
  return user.hash(user.password, salt).then(hash => {
    user.password = hash
  })
})

User.addHook('beforeUpdate', user => {
  if (user.changed('password')) {
    user.salt = bcrypt.genSaltSync(9)

    return user
      .hash(user.password, user.salt)
      .then(hash => (user.password = hash))
  }
})

module.exports = User
