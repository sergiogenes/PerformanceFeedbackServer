const { ValidationError } = require('sequelize')

const { User, Position } = require('../models')

const allUser = async (req, res, next) => {
  let user

  try {
    user = await User.findAll({
      where: { deactivated_at: null },
      include: [
        {
          model: Position,
          as: 'position',
        },
        {
          model: User,
          as: 'leader',
        },
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
        {
          model: Position,
        },
        {
          model: User,
          as: 'leader',
        },
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
        {
          model: Position,
        },
        {
          model: User,
          as: 'leader',
        },
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
      include: [{ model: Position, attributes: ['name'] }],
    })
  } catch (error) {
    return res.send(console.error(error)).status(400)
  }

  return res.send(user)
}

const createUser = async (req, res, next) => {
  const { leader, position, ...userFields } = req.body

  try {
    const positionToSet = await Position.findOne({
      where: { name: position },
    })

    const leaderToSet = await User.findOne({ where: { id: leader } })

    // TODO recuperar el teamId
    // TODO recuperar el officeId

    // TODO cambiar por findOrBuild y luego save
    const [user, created] = await User.findOrCreate({
      where: { email: userFields.email },
      defaults: {
        ...userFields,
        password: userFields.fileNumber,
      },
      include: [{ model: Position }, { model: User, as: 'leader' }],
    })
    if (created) {
      await user.setPosition(positionToSet)
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
  const { leader, position, ...userFields } = req.body

  let user, positionToSet, leaderToSet

  if (position)
    positionToSet = await Position.findOne({ where: { name: position } })
  if (leader) leaderToSet = await User.findOne({ where: { id: leader } })

  try {
    user = await User.findByPk(req.params.id)
    user.update({ ...userFields }, { returning: true })
    console.log(user)

    if (positionToSet) await user.setPosition(positionToSet)
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
