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

  static findByLegajo(legajo) {
    return User.findOne({ where: { legajo } });
  }
}

User.init(
  {
    nombre: {
      type: S.STRING,
      allowNull: false,
    },
    apellido: {
      type: S.STRING,
      allowNull: false,
    },
    imagen: {
      type: S.STRING,
    },
    legajo: {
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
    turno: {
      type: S.ENUM("mañana", "tarde", "noche"),
    },
  },
  { sequelize: db, modelName: "user", timestamps: false }
);

User.addHook("beforeCreate", (user) => {
  user.password = user.legajo;
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
