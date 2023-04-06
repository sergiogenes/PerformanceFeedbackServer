const { ValidationError } = require('sequelize')
const { User, Team, Position } = require('../models')

const allTeam = async (req, res, next) => {
  try {
    const team = await Team.findAll({
      include: [
        {
          model: User,
          where: { deactivated_at: null },
          include: [{ model: Position }],
        },
      ],
    })
    res.send(team)
  } catch (error) {
    return res.send(console.error(error)).status(400)
  }
}

const oneTeam = async (req, res, next) => {
  try {
    const team = await Team.findByPk(req.params.id, {
      include: [{ model: User }],
    })
    res.send(team)
  } catch (error) {
    return res.send(console.error(error)).status(400)
  }
}

const createTeam = async (req, res, next) => {
  try {
    const { name } = req.body
    const team = await Team.create({ name })

    res.status(201).send(team)
  } catch (error) {
    if (error instanceof ValidationError) error.status = 422
    console.error(error)
    next(error)
  }
}

const modifyTeam = async (req, res, next) => {
  const { name } = req.body

  try {
    const team = await Team.update(
      { name },
      { where: { id: req.params.id }, returning: true }
    )
    res.send(team)
  } catch (error) {
    return res.send(console.error(error)).status(400)
  }
}

const deleteTeam = async (req, res, next) => {
  try {
    await Team.destroy({ where: { id: req.params.id } })
    res.sendStatus(204)
  } catch (error) {
    return res.send(console.error(error)).status(400)
  }
}

module.exports = {
  createTeam,
  modifyTeam,
  deleteTeam,
  allTeam,
  oneTeam,
}
