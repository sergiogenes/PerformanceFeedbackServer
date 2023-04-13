const { ValidationError } = require('sequelize')
const { Category, Indicator } = require('../models')

const allIndicator = async (req, res, next) => {
  try {
    const indicator = await Indicator.findAll({
      order: [['id', 'ASC']],
      include: [{ model: Category, as: 'category' }],
    })
    res.send(indicator)
  } catch (error) {
    next(error)
  }
}

const oneIndicator = async (req, res, next) => {
  try {
    const indicator = await Indicator.findByPk(req.params.id, {
      include: [{ model: Category, as: 'category' }],
    })
    res.send(indicator)
  } catch (error) {
    next(error)
  }
}

const allIndicatorCategory = async (req, res, next) => {
  try {
    const indicator = await Indicator.findAll({
      where: { categoryId: req.params.id },
      include: [{ model: Category, as: 'category' }],
    })
    res.send(indicator)
  } catch (error) {
    next(error)
  }
}

const createIndicator = async (req, res, next) => {
  try {
    const { category, description, goal } = req.body
    const categoryToSet = await Category.findOne({ where: { name: category } })
    const indicator = await Indicator.create({
      description,
      goal,
    })
    await indicator.setCategory(categoryToSet)
    res.status(201).send(indicator)
  } catch (error) {
    if (error instanceof ValidationError) error.status = 422
    next(error)
  }
}

const modifyIndicator = async (req, res, next) => {
  const { category, ...indicatorFields } = req.body
  let categoryToSet

  if (category)
    categoryToSet = await Category.findOne({ where: { name: category } })

  try {
    const indicator = await Indicator.findByPk(req.params.id)
    indicator.update({ ...indicatorFields }, { returning: true })

    if (categoryToSet) await indicator.setCategory(categoryToSet)

    res.send(indicator)
  } catch (error) {
    next(error)
  }
}

const deleteIndicator = async (req, res, next) => {
  try {
    await Indicator.destroy({ where: { id: req.params.id } })
    res.sendStatus(204)
  } catch (error) {
    next(error)
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
