const { Office, Country } = require('../models')

const errorInvalidCharacters = { Error: 'Error no characters' };
  const errorEmptyOfficeName = { Error: 'Empty office name' };
  const errorTooManyCharacters = { Error: 'The name has too many characters' }

const getOffices = async (req, res) => {
  try {
    const offices = await Office.findAll({
      include: { model: Country, as: 'country' },
      order: [['id', 'ASC']],
    })

    if (!offices) {
      return res.status(401).send('Error: Offices not found')
    }
    return res.status(200).json(offices)
  } catch (error) {
    return res.send(console.error(error)).status(400)
  }
}

const createOffice = async (req, res) => {
  const { name, countryId } = req.body

  if (!name) {
    return res.status(400).json(errorEmptyOfficeName)
  } else if (typeof name !== 'string') {
    return res.status(400).json(errorInvalidCharacters)
  } else if (name.length > 25) {
    return res.status(400).json(errorTooManyCharacters)
  }

  try {
    const officeChecker = await Office.findOne({ where: { name } })

    if (officeChecker) {
      return res.status(400).send({ Error: 'The office already exist' })
    } else {
      const officeValidate = await Office.create(
        { name, countryId },
        { include: { model: Country, as: 'country' } }
      )
      return res.status(201).json(officeValidate)
    }
  } catch (error) {
    return res.send(console.error(error)).status(400)
  }
}

const updateOffice = async (req, res) => {
  const { name, countryId } = req.body
  const { id } = req.params

  if (!name || !id) {
    return res.status(400).json(errorEmptyOfficeName)
  } else if (typeof name !== 'string') {
    return res.status(400).json(errorInvalidCharacters)
  } else if (name.length > 25) {
    return res.status(400).json(errorTooManyCharacters)
  }

  try {
    const officeChecker = await Office.findOne({ where: { name } })

    if (officeChecker) {
      return res.status(403).send('The office name already exist')
    } else {
      const officeUpdate = await Office.update(
        { name, countryId },
        { where: { id } }
      )

      officeUpdate > 0
        ? res.status(200).send('The office was successfull updated')
        : res.status(400).send('The office was not updated')
    }
  } catch (error) {
    return res.send(console.error(error)).status(400)
  }
}

const deleteOffice = async (req, res) => {
  const { id } = req.params

  if (!id) return res.status(400).json({ Error: 'Empty fields' })

  try {
    const office = await Office.destroy({ where: { id } })
    office === 0
      ? res.status(404).json({ Error: 'The office id was not found' })
      : res.status(200).send('The office was successfully deleted')
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
