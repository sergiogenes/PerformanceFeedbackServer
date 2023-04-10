const { ValidationError } = require('sequelize')
const { User, Position, Team, Category, Office, Review } = require('../models')

const allUser = async (req, res, next) => {
  let user

  try {
    user = await User.findAll({
      where: { deactivated_at: null },
      include: [
        { model: Position, as: 'position' },
        { model: Team, as: 'team' },
        { model: Category, as: 'category' },
        { model: Office, as: 'office' },
        { model: User, as: 'leader' },
      ],
    })
  } catch (error) {
    return res.send(console.error(error)).status(400)
  }

  return res.send(user)
}

const allEmpleados = async (req, res, next) => {
  let user

  try {
    user = await User.findAll({
      where: { leaderId: req.params.id },
      include: [
        { model: Position, as: 'position' },
        { model: Team, as: 'team' },
        { model: Category, as: 'category' },
        { model: Office, as: 'office' },
        { model: User, as: 'leader' },
      ],
    })
  } catch (error) {
    return res.send(console.error(error)).status(400)
  }

  return res.send(user)
}

const includeDeactivated = async (req, res, next) => {
  let user

  try {
    user = await User.findAll({
      include: [
        { model: Position, as: 'position' },
        { model: Team, as: 'team' },
        { model: Category, as: 'category' },
        { model: Office, as: 'office' },
        { model: User, as: 'leader' },
      ],
    })
  } catch (error) {
    return res.send(console.error(error)).status(400)
  }

  return res.send(user)
}

const oneUser = async (req, res, next) => {
  const { id } = req.params
  let user

  try {
    user = await User.findByPk(id, {
      include: [
        { model: Position, as: 'position' },
        { model: Team, as: 'team' },
        { model: Category, as: 'category' },
        { model: Office, as: 'office' },
        { model: User, as: 'leader' },
        {
          model: Review,
          as: 'evaluated',
          attributes: ['indicator', 'goal', 'data', 'result', 'review', 'date'],
        }
      ],
    })
  } catch (error) {
    return res.send(console.error(error)).status(400)
  }

  return res.send(user)
}

const createUser = async (req, res, next) => {
  const { leader, position, team, category, office, ...userFields } = req.body

  try {
    const positionToSet = await Position.findByPk(position)
    const teamToSet = await Team.findByPk(team)
    const categoryToSet = await Category.findByPk(team)
    const officeToSet = await Office.findByPk(office)
    const leaderToSet = await User.findOne({ where: { fileNumber: leader } })

    // TODO cambiar por findOrBuild y luego save
    const [user, created] = await User.findOrCreate({
      where: { email: userFields.email },
      defaults: {
        ...userFields,
        password: userFields.fileNumber,
      },
      include: [
        { model: Position, as: 'position' },
        { model: Team, as: 'team' },
        { model: Category, as: 'category' },
        { model: Office, as: 'office' },
        { model: User, as: 'leader' },
      ],
    })
    if (created) {
      await user.setPosition(positionToSet)
      await user.setTeam(teamToSet)
      await user.setCategory(categoryToSet)
      await user.setOffice(officeToSet)
      await user.setLeader(leaderToSet)
    }

    res.status(201).send(user)
  } catch (error) {
    if (error instanceof ValidationError) error.status = 422
    console.error(error)
    next(error)
  }
}

const modifyUser = async (req, res, next) => {
  const { leader, position, team, category, office, ...userFields } = req.body

  let user, positionToSet, teamToSet, categoryToSet, officeToSet, leaderToSet

  if (position) positionToSet = await Position.findByPk(position)
  if (team) teamToSet = await Team.findByPk(team)
  if (category) categoryToSet = await Category.findByPk(team)
  if (office) officeToSet = await Office.findByPk(office)
  if (leader) leaderToSet = await User.findOne({ where: { id: leader } })

  try {
    user = await User.findByPk(req.params.id)
    user.update({ ...userFields }, { returning: true })

    if (positionToSet) await user.setPosition(positionToSet)
    if (teamToSet) await user.setTeam(teamToSet)
    if (categoryToSet) await user.setCategory(categoryToSet)
    if (officeToSet) await user.setOffice(officeToSet)
    if (leaderToSet) await user.setLeader(leaderToSet)

    res.send(user)
  } catch (error) {
    return res.send(console.error(error)).status(400)
  }
}

const deactivateUser = async (req, res, next) => {
  try {
    await User.update(
      { deactivated_at: new Date() },
      { where: { id: req.params.id }, returning: true, individualHooks: true }
    )
    res.sendStatus(204)
  } catch (error) {
    return res.send(console.error(error)).status(400)
  }
}

module.exports = {
  allUser,
  oneUser,
  modifyUser,
  createUser,
  includeDeactivated,
  deactivateUser,
  allEmpleados,
}
