const { Country } = require('../models')

const getCountries = async (req, res) => {
  try {
    const countries = await Country.findAll({
      order: [['id', 'ASC']],
    })
    return res.status(200).json(countries)
  } catch (error) {
    return res.status(400).send(error)
  }
}

module.exports = {
  getCountries,
}
