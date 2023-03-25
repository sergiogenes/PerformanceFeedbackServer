const S = require("sequelize");
const db = require("../db/index");
const bcrypt = require("bcrypt");

class User extends S.Model {
  hash(password, salt) {
    return bcrypt.hash(password, salt);
  }

  validatePassword(password) {
    return this.hash(password, this.salt).then(
      (hash) => hash === this.password
    );
  }

  static findByEmail(email) {
    return User.findOne({ where: { email } });
  }

  static findByFileNumber(fileNumber) {
    return User.findOne({ where: { fileNumber } });
  }
}

User.init(
  {
    firstName: {
      type: S.STRING,
      allowNull: false,
    },
    lastName: {
      type: S.STRING,
      allowNull: false,
    },
    email: {
      type: S.STRING,
      allowNull: false,
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
        len: [8, 32],
      },
    },
    salt: {
      type: S.STRING,
    },
    isAdmin: {
      type: S.BOOLEAN,
      defaultValue: false,
    },
    isActive: {
      type: S.BOOLEAN,
      defaultValue: true,
    },
    turno: {
      type: S.ENUM("mañana", "tarde", "noche"),
    },
  },
  { sequelize: db, modelName: "user", timestamps: false }
);

User.addHook("beforeCreate", (user) => {
  user.password = user.fileNumber;
  const salt = bcrypt.genSaltSync(9);
  user.salt = salt;

  return user.hash(user.password, user.salt).then((hash) => {
    user.password = hash;
  });
});

User.beforeUpdate((user) => {
  const salt = bcrypt.genSaltSync(9);
  user.salt = salt;
  return user.hash(user.password, user.salt).then((hash) => {
    user.password = hash;
  });
});

module.exports = User;
