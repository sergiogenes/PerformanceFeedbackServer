const { Position, User } = require('../models')

const getPositions = async (req, res, next) => {
  let positions

  try {
    positions = await Position.findAll({
      include: [{ model: User, as: 'user' }],
      order: [['id', 'ASC']],
    })

    if (!positions)
      return res.status(401).send('No se han agregado puestos de trabajo')
  } catch (error) {
    next(error)
  }

  return res.status(200).send(positions)
}

const createPosition = async (req, res, next) => {
  const name = req.body.name
  let createdPosition
  if (!name) return res.status(400).send('Nombre vacio')

  try {
    const position = await Position.findOne({ where: { name } })

    if (position) {
      return res.status(400).send('El puesto ya existe')
    } else {
      const positionValidate = await Position.create({ name })
      createdPosition = positionValidate
    }
    return res.status(201).send(createdPosition)
  } catch (error) {
    next(error)
  }
}

const updatePosition = async (req, res, next) => {
  const { name } = req.body
  const id = req.params.id
  if (!id || !name) return res.status(400).send('Campos vacios')

  try {
    const positionById = await Position.findAll({ where: { name } })

    if (positionById.length > 0) {
      return res.status(403).send('El nombre del puesto ya existe')
    } else {
      const position = await Position.update({ name }, { where: { id } })

      position > 0
        ? res.status(200).send('El puesto fue actualizado')
        : res.status(400).send('El usuario no existe')
    }
  } catch (error) {
    next(error)
  }
}

const deletePosition = async (req, res, next) => {
  const id = req.params.id
  if (!id) return res.status(400).send('Campos vacíos')

  try {
    const position = await Position.destroy({ where: { id } })
    position === 0
      ? res.status(404).send('No se encontró el puesto a eliminar')
      : res.status(200).send('Puesto eliminado con éxito!')
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getPositions,
  createPosition,
  deletePosition,
  updatePosition,
}
