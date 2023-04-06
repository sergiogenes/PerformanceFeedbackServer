const { Office, User, Country } = require('../models')

const getOffices = async (req, res) => {
  try {
    const offices = await Office.findAll({
      include: { model: Country, as: 'country' },
      order: [['id', 'ASC']],
    })

    // console.log(offices)

    if (!offices) {
      return res
        .status(401)
        .send('Error: No se han agregado puestos de trabajo')
    }
    return res.status(200).json(offices)
  } catch (error) {
    return res.send(console.error(error)).status(400)
  }
}

const createOffice = async (req, res) => {
  const { name } = req.body

  if (typeof name !== 'string') {
    return res.status(400).json({ Error: 'Caracteres no validos' })
  } else if (!name) {
    return res.status(400).json({ Error: 'Nombre de oficina vacio' })
  } else if (name.length > 25) {
    return res.status(400).json({ Error: 'Demasiados caracteres' })
  }

  try {
    const office = await Office.findOne({ where: { name } })

    if (office) {
      return res.status(400).send({ Error: 'La oficina ya existe' })
    } else {
      const officeValidate = await Office.create({ name })
      return res.status(201).json(officeValidate)
    }
  } catch (error) {
    return res.send(console.error(error)).status(400)
  }
}

const updateOffice = async (req, res) => {
  const { name } = req.body
  const id = req.params.id

  if (typeof name !== 'string') {
    return res.status(400).json({ Error: 'Caracteres no validos' })
  } else if (!name || !id) {
    return res.status(400).json({ Error: 'Nombre de oficina vacio' })
  } else if (name.length > 25) {
    return res.status(400).json({ Error: 'Demasiados caracteres' })
  }

  try {
    const officeById = await Office.findAll({ where: { name } })

    if (officeById.length > 0) {
      return res.status(403).send('El nombre del puesto ya existe')
    } else {
      const office = await Office.update({ name }, { where: { id } })

      office > 0
        ? res.status(200).send('El puesto fue actualizado')
        : res.status(400).send('El usuario no existe')
    }
  } catch (error) {
    return res.send(console.error(error)).status(400)
  }
}

const deleteOffice = async (req, res) => {
  const id = req.params.id
  if (!id) return res.status(400).json({ Error: 'Campos vacíos' })

  try {
    const office = await Office.destroy({ where: { id } })
    office === 0
      ? res.status(404).json({ Error: 'No se encontró el puesto a eliminar' })
      : res.status(200).send('Puesto eliminado con éxito!')
  } catch (error) {
    return res.send(console.error(error)).status(400)
  }
}

module.exports = {
  getOffices,
  createOffice,
  updateOffice,
  deleteOffice,
}
