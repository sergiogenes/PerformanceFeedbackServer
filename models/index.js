const User = require('./User')
const Country = require('./Country')
const Office = require('./Office')
const Team = require('./Team')

User.hasMany(User, { as: 'employee' })
User.belongsTo(User, { as: 'leader' })

Country.hasMany(Office)
Office.belongsTo(Country)

Office.hasMany(User)
User.belongsTo(Office)

Team.hasMany(User)
User.belongsTo(Team)

module.exports = { User }
