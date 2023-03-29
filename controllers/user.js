const { ValidationError } = require('sequelize')
const { Position } = require('../models')

const User = require('../models/User')

const allUser = async (req, res, next) => {
  let user

  try {
    user = await User.findAll({
      where: { deactivated_at: null },
      include: [
        {
          model: Position,
          attributes: ['name'],
        },
        {
          model: User,
          as: 'leader',
          attributes: [
            'id',
            'firstName',
            'lastName',
            'email',
            'image',
            'fileNumber',
            'isAdmin',
            'shift',
            'deactivated_at',
          ],
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
        { model: Position, attributes: ['name'] },
        {
          model: User,
          as: 'leader',
          attributes: [
            'id',
            'firstName',
            'lastName',
            'email',
            'image',
            'fileNumber',
            'isAdmin',
            'shift',
            'deactivated_at',
          ],
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
      include: [
        { model: Position, attributes: ['name'] },
        {
          model: User,
          as: 'leader',
          attributes: [
            'id',
            'firstName',
            'lastName',
            'email',
            'image',
            'fileNumber',
            'isAdmin',
            'shift',
            'deactivated_at',
          ],
        },
      ],
    })
  } catch (error) {
    return res.send(console.error(error)).status(400)
  }

  return res.send(user)
}

const createUser = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      password,
      email,
      fileNumber,
      shift,
      image,
      position,
      leader,
    } = req.body

    const searchedPosition = await Position.findByPk(position)
    const searchedUser = await User.findByPk(leader)

    const addedUser = await User.create(
      {
        firstName,
        lastName,
        password,
        email,
        fileNumber,
        shift,
        image,
        positionId: searchedPosition.id,
        parentId: searchedUser.id,
      },
      {
        include: [{ model: Position }, { model: User, as: 'leader' }],
      }
    )
    res.status(201).send(addedUser)
  } catch (error) {
    if (error instanceof ValidationError) error.status = 422
    next(error)
  }
}

const modifyUser = async (req, res, next) => {
  const { firstName, lastName, shift, password, team, office, category } =
    req.body
  let user

  try {
    user = await User.update(
      { firstName, lastName, shift, password, team, office, category },
      { where: { id: req.params.id }, returning: true, individualHooks: true }
    )
  } catch (error) {
    return res.send(console.error(error)).status(400)
  }

  return res.send(user)
}

const deactivateUser = async (req, res, next) => {
  let user
  let timestamp = Date.now()

  try {
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
}
