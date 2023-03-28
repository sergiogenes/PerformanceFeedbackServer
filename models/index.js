const User = require('./User')
const Position = require('./Position')

User.hasMany(User, { as: 'employee', foreignKey: 'parentId' })
User.belongsTo(User, { as: 'leader', foreignKey: 'parentId' })

Position.hasMany(User, { foreignKey: 'positionId' })
User.belongsTo(Position, { foreignKey: 'positionId' })

module.exports = { User, Position }
