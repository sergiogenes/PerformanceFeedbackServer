const User = require('./user')
const Team = require('./team')
const Review = require('./review')
const Position = require('./position')
const Office = require('./office')
const Indicator = require('./indicator')
const Country = require('./country')
const Category = require('./category')

// Relation Leader - Led
User.hasMany(User, { as: 'led', foreignKey: 'leaderId' })
User.belongsTo(User, { as: 'leader', foreignKey: 'leaderId' })

// Relation User - Team
User.belongsTo(Team, { as: 'team', foreignKey: 'teamId' })
Team.hasMany(User, { foreignKey: 'teamId' })

// Relation User - Review | Evaluator
User.hasMany(Review, { as: 'evaluator', foreignKey: 'evaluatorId' })
Review.belongsTo(User, { as: 'evaluator', foreignKey: 'evaluatorId' })

// Relation User - Review | Evaluated
User.hasMany(Review, { as: 'evaluated', foreignKey: 'evaluatedId' })
Review.belongsTo(User, { as: 'evaluated', foreignKey: 'evaluatedId' })

// Relation User - Position
User.belongsTo(Position, { as: 'position', foreignKey: 'positionId' })
Position.hasMany(User, { as: 'user', foreignKey: 'positionId' })

// Relation User - Office
User.belongsTo(Office, { as: 'office', foreignKey: 'officeId' })
Office.hasMany(User, { foreignKey: 'officeId' })

// Relation Office - Country
Office.belongsTo(Country, { as: 'country', foreignKey: 'countryId' })
Country.hasMany(Office, { foreignKey: 'countryId' })

// Relation User - Category
User.belongsTo(Category, { as: 'category', foreignKey: 'categoryId' })
Category.hasMany(User, { foreignKey: 'categoryId' })

// Relation Category - Indicator
Category.hasMany(Indicator, { as: 'category', foreignKey: 'categoryId' })
Indicator.belongsTo(Category, { as: 'category', foreignKey: 'categoryId' })

module.exports = {
  User,
  Team,
  Review,
  Position,
  Office,
  Indicator,
  Country,
  Category,
}
