const { timeStamp } = require('console')
const User = require('../models/User')

const allUser = async (req, res, next) => {
  let user

  try {
    user = await User.findAll({ where: { desactivated_at: null } })
  } catch (error) {
    return res.send(console.error(error)).status(400)
  }

  return res.send(user)
}

const includeDesactivated = async (req, res, next) => {
  let user

  try {
    user = await User.findAll()
  } catch (error) {
    return res.send(console.error(error)).status(400)
  }

  return res.send(user)
}

const oneUser = async (req, res, next) => {
  const { id } = req.params
  let user

  try {
    user = await User.findByPk(id)
  } catch (error) {
    return res.send(console.error(error)).status(400)
  }

  return res.send(user)
}

const modifyUser = async (req, res, next) => {
  const { firstName, lastName, shift, password, team, oficce, category } =
    req.body
  let user

  try {
    user = await User.update(
      { firstName, lastName, shift, password, team, oficce, category },
      { where: { id: req.params.id }, returning: true, individualHooks: true }
    )
  } catch (error) {
    return res.send(console.error(error)).status(400)
  }

  return res.send(user)
}

const desactivateUser = async (req, res, next) => {
  let user
  let timestamp = Date.now()

  try {
    user = await User.update(
      { desactivated_at: new Date() },
      { where: { id: req.params.id }, returning: true, individualHooks: true }
    )
  } catch (error) {
    return res.send(console.error(error)).status(400)
  }

  return res.send(user)
}

module.exports = {
  allUser,
  oneUser,
  modifyUser,
  includeDesactivated,
  desactivateUser,
}
