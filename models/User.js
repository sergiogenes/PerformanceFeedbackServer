const S = require('sequelize')
const db = require('../db/index')
const bcrypt = require('bcrypt')

class User extends S.Model {
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
      type: S.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    lastName: {
      type: S.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: S.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    image: {
      type: S.STRING,
    },
    fileNumber: {
      type: S.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: S.STRING,
      validate: {
        isStrongPassword: {
          minLength: 8,
          minLowercase: 0,
          minUppercase: 0,
          minNumbers: 0,
          minSymbols: 0,
        },
      },
    },
    salt: {
      type: S.STRING,
    },
    isAdmin: {
      type: S.BOOLEAN,
      defaultValue: false,
    },
    deactivated_at: {
      type: S.DATE,
    },
    shift: {
      type: S.ENUM('morning', 'afternoon', 'nigth'),
    },
  },
  { sequelize: db, modelName: 'user', timestamps: false }
)

User.addHook('beforeCreate', user => {
  //user.password = user.fileNumber;
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

module.exports = User
