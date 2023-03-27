const User = require("./User");

User.hasMany(User, { as: "employee", foreignKey: "parentId" });
User.belongsTo(User, { as: "leader", foreignKey: "parentId" });

module.exports = { User };
