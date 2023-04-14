const { ValidationError } = require('sequelize')
const { User, Team, Position, Category } = require('../models')

const allTeam = async (req, res, next) => {
  try {
    const teams = await Team.findAll({
      include: [
        {
          model: User,
          // TODO: Volver a filtrar con where o mejor implementar `findAllActive`
          include: [
            { model: Position, as: 'position' },
            { model: Category, as: 'category' },
          ],
          order: [['id', 'ASC']],
        },
      ],
    })
    res.send(teams)
  } catch (error) {
    next(error)
  }
}

const oneTeam = async (req, res, next) => {
  try {
    const team = await Team.findByPk(req.params.id, {
      include: [
        {
          model: User,
          include: [
            { model: Position, as: 'position' },
            { model: Category, as: 'category' },
          ],
        },
      ],
    })
    res.send(team)
  } catch (error) {
    next(error)
  }
}

const createTeam = async (req, res, next) => {
  try {
    const { name } = req.body
    const [team, created] = await Team.findOrCreate({
      where: { name },
      defaults: { name },
    })
    console.log(created)
    if (created) {
      return res.status(201).send(team)
    } else {
      return res.status(409).send('El equipo ya existe')
    }
  } catch (error) {
    if (error instanceof ValidationError) error.status = 422
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
    next(error)
  }
}

const deleteTeam = async (req, res, next) => {
  try {
    await Team.destroy({ where: { id: req.params.id } })
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createTeam,
  modifyTeam,
  deleteTeam,
  allTeam,
  oneTeam,
}
