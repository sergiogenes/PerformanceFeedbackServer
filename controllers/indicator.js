const { ValidationError } = require('sequelize')
const { Category, Indicator } = require('../models')

const allIndicator = async (req, res, next) => {
  try {
    const indicator = await Indicator.findAll({
      include: [{ model: Category }],
    })
    res.send(indicator)
  } catch (error) {
    return res.send(console.error(error)).status(400)
  }
}

const oneIndicator = async (req, res, next) => {
  try {
    const indicator = await Indicator.findByPk(req.params.id, {
      include: [{ model: Category }],
    })
    res.send(indicator)
  } catch (error) {
    return res.send(console.error(error)).status(400)
  }
}

const allIndicatorCategory = async (req, res, next) => {
  try {
    const indicator = await Indicator.findAll({
      where: { categoryId: req.params.id },
      include: [{ model: Category }],
    })
    res.send(indicator)
  } catch (error) {
    return res.send(console.error(error)).status(400)
  }
}

const createIndicator = async (req, res, next) => {
  try {
    const { category, description, goal } = req.body
    console.log(category)

    const categoryToSet = await Category.findOne({ where: { name: category } })

    const indicator = await Indicator.create({
      description,
      goal,
    })

    await indicator.setCategory(categoryToSet)

    res.status(201).send(indicator)
  } catch (error) {
    if (error instanceof ValidationError) error.status = 422
    console.error(error)
    next(error)
  }
}

const modifyIndicator = async (req, res, next) => {
  const { category, ...indicatorFields } = req.body
  let categoryToSet
  if (category) {
    categoryToSet = await Category.findOne({ where: { name: category } })
  }

  try {
    const indicator = await Indicator.findByPk(req.params.id)

    indicator.update({ ...indicatorFields }, { returning: true })

    if (categoryToSet) await indicator.setCategory(categoryToSet)

    res.send(indicator)
  } catch (error) {
    return res.send(console.error(error)).status(400)
  }
}

const deleteIndicator = async (req, res, next) => {
  try {
    await Indicator.destroy({ where: { id: req.params.id } })
    res.sendStatus(204)
  } catch (error) {
    return res.send(console.error(error)).status(400)
  }
}

module.exports = {
  allIndicator,
  oneIndicator,
  allIndicatorCategory,
  createIndicator,
  modifyIndicator,
  deleteIndicator,
}
