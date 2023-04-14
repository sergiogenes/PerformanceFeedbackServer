const { Country } = require('../models')

const getCountries = async (req, res, next) => {
  try {
    const countries = await Country.findAll({
      order: [['id', 'ASC']],
    })
    res.status(200).json(countries)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getCountries,
}
