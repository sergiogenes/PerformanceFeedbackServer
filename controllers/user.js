const { ValidationError } = require('sequelize')

const User = require('../models/User')

const allUser = async (req, res, next) => {
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

const createUser = async (req, res, next) => {
  try {
    const addedUser = await User.create(req.body)
    res.status(201).send(addedUser)
  } catch (error) {
    if (error instanceof ValidationError) error.status = 422
    next(error)
  }
}

module.exports = { allUser, oneUser, createUser }
