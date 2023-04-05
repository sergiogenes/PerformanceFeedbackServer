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
      include: [{ model: Position, attributes: ['name'] }],
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
  const {
    firstName,
    lastName,
    email,
    fileNumber,
    position: positionId,
    shift,
  } = req.body
  let user

  try {
    user = await User.update(
      { firstName, lastName, email, fileNumber, positionId, shift },
      { where: { id: req.params.id }, returning: true, individualHooks: true }
    )
  } catch (error) {
    return res.send(console.error(error)).status(400)
  }

  return res.send(user)
}

const deactivateUser = async (req, res, next) => {
  let user
  const timestamp = Date.now()

  try {
    console.log('HOLA')
    user = await User.update(
      { deactivated_at: new Date() },
      { where: { id: req.params.id }, returning: true, individualHooks: true }
    )
  } catch (error) {
    return res.send(console.error(error)).status(400)
  }

  return res.sendStatus(204)
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
