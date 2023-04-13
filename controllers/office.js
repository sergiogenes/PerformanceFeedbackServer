const { Office, Country, Sequelize } = require('../models')
const errorInvalidCharacters = 'Caracteres no validos'
const errorEmptyOfficeName = 'Nombre de oficina vacio'
const errorTooManyCharacters = 'El nombre tiene muchos caracteres'
const errorOficeNotFound = 'Oficina no encontrada'
const errorOfficeAlReadyExist = 'La oficina ya existe'
const errorCountryNotExist = 'El país ingresado no existe'

const getOffices = async (req, res, next) => {
  try {
    const offices = await Office.findAll({
      include: { model: Country, as: 'country' },
      order: [['id', 'ASC']],
    })

    if (!offices) {
      return res.status(401).send(errorOficeNotFound)
    }
    return res.status(200).send(offices)
  } catch (error) {
    next(error)
  }
}

const createOffice = async (req, res, next) => {
  const { name, countryId } = req.body

  if (!name) {
    return res.status(400).send(errorEmptyOfficeName)
  } else if (typeof name !== 'string') {
    return res.status(400).send(errorInvalidCharacters)
  } else if (name.length > 25) {
    return res.status(400).send(errorTooManyCharacters)
  }

  try {
    const officeChecker = await Office.findOne({ where: { name } })
    const countryChecker = await Country.findByPk(countryId)

    if (officeChecker) {
      return res.status(400).send(errorOfficeAlReadyExist)
    } else if (!countryChecker) {
      return res.status(400).send(errorCountryNotExist)
    } else {
      const officeValidate = await Office.create(
        { name, countryId },
        { include: { model: Country, as: 'country' } }
      )
      return res.status(201).send(officeValidate)
    }
  } catch (error) {
    next(error)
  }
}

const updateOffice = async (req, res, next) => {
  const { name, countryId } = req.body
  const { id } = req.params

  if (!name || !id) {
    return res.status(400).send(errorEmptyOfficeName)
  } else if (typeof name !== 'string') {
    return res.status(400).send(errorInvalidCharacters)
  } else if (name.length > 25) {
    return res.status(400).send(errorTooManyCharacters)
  }

  try {
    const officeById = await Office.findAll({
      where: { name, id: { [Sequelize.Op.not]: id } },
    })
    const countryChecker = await Country.findByPk(countryId)

    if (officeById.length) {
      return res.status(403).send(errorOfficeAlReadyExist)
    } else if (!countryChecker) {
      return res.status(400).send(errorCountryNotExist)
    } else {
      const officeUpdate = await Office.update(
        { name, countryId },
        { where: { id } }
      )

      officeUpdate > 0
        ? res.status(200).send('La oficina fue actualizada correctamente')
        : res.status(400).send('La oficina no se actualizo')
    }
  } catch (error) {
    next(error)
  }
}

const deleteOffice = async (req, res, next) => {
  const { id } = req.params

  if (!id) return res.status(400).send('Campos vacíos')

  try {
    const office = await Office.destroy({ where: { id } })
    office === 0
      ? res.status(404).send('No se encontró la oficina')
      : res.status(200).send('La oficina fue eliminada correctamente')
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getOffices,
  createOffice,
  updateOffice,
  deleteOffice,
}
