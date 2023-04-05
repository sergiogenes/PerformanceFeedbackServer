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

const createIndicator = async (req, res, next) => {
  try {
    const { category, description, goal } = req.body
    console.log(category)

    const categoryToSet = await Category.findOne({ where: { name: category } })
    console.log(categoryToSet.dataValues.id)

    const indicator = await Indicator.build({
      categoryId: categoryToSet.dataValues.id,
      description,
      goal,
    })
    // await indicator.setCategory(categoryToSet)

    await indicator.save()
    res.status(201).send(indicator)
  } catch (error) {
    if (error instanceof ValidationError) error.status = 422
    console.error(error)
    next(error)
  }
}

const modifyIndicator = async (req, res, next) => {
  const { ...indicatorFields } = req.body

  try {
    const indicator = await Indicator.update(
      { ...indicatorFields },
      { where: { id: req.params.id }, returning: true }
    )
    res.send(indicator)
  } catch (error) {
    return res.send(console.error(error)).status(400)
  }
}

const deleteIndicator = async (req, res, next) => {
  try {
    const indicator = await Indicator.destroy({ where: { id: req.params.id } })
    res.sendStatus(204)
  } catch (error) {
    return res.send(console.error(error)).status(400)
  }
}

module.exports = {
  allIndicator,
  oneIndicator,
  createIndicator,
  modifyIndicator,
  deleteIndicator,
}
