const { Position, User } = require('../models')
const { verifyToken } = require('../utils/token')

const validatePermissions = async (req, res, next) => {
  const verifyAdmin = verifyToken(req.cookies.token).isAdmin

  if (!verifyAdmin) {
    return res.status(403).send({ Error: 'Permisos no concedidos' })
  }
  next()
}

const getPositions = async (req, res, next) => {
  let Positions

  try {
    const positions = await Position.findAll({
      include: [
        {
          model: User,
        },
      ],
      order: [['id', 'ASC']],
    })

    if (!positions)
      return res
        .status(401)
        .send('Error: No se han agregado puestos de trabajo')

    Positions = positions
  } catch (error) {
    return res.send(console.error(error)).status(400)
  }

  return res.status(200).json(Positions)
}

const createPosition = async (req, res, next) => {
  const name = req.body.name.toLowerCase()
  let createdPosition

  if (!name) return res.status(400).json({ Error: 'Nombre vacio' })

  try {
    const position = await Position.findOne({ where: { name } })

    if (position) {
      return res.status(400).send({ Error: 'El puesto ya existe' })
    } else {
      const positionValidate = await Position.create({ name })
      createdPosition = positionValidate
    }
  } catch (error) {
    return res.send(console.error(error)).status(400)
  }
  return res.status(201).json(createdPosition)
}

const updatePosition = async (req, res, next) => {
  const { name, id } = req.body

  if (!id || !name) return res.status(400).json({ Error: 'Campos vacios' })

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
    return res.send(console.error(error)).status(400)
  }
}

const deletePosition = async (req, res, next) => {
  const { id, name } = req.body

  if (!id || !name) return res.status(400).json({ Error: 'Campos vacios' })

  try {
    const position = await Position.destroy({ where: { name, id } })
    position === 0
      ? res.status(404).json({ Error: 'No se encontro el puesto a eliminar' })
      : res.status(200).send('Puesto eliminado con existo')
  } catch (error) {
    return res.send(console.error(error)).status(400)
  }
}

module.exports = {
  getPositions,
  createPosition,
  deletePosition,
  validatePermissions,
  updatePosition,
}
