const S = require("sequelize");
const db = require("../db/index");
const bcrypt = require("bcryptjs");

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

  static findByFilenumber(filenumber) {
    return User.findOne({ where: { filenumber } });
  }
}

User.init(
  {
    name: {
      type: S.STRING,
      allowNull: false,
    },
    lastname: {
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
    filenumber: {
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
  user.password = user.filenumber;
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
