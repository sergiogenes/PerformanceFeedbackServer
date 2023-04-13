const { Review, User, Category } = require('../models')

const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.findAll({
      include: [
        {
          model: User,
          as: 'evaluated',
          include: [{ model: Category, as: 'category' }],
        },
        {
          model: User,
          as: 'evaluator',
        },
      ],
    })
    res.send(reviews)
  } catch (error) {
    next(error)
  }
}

const getReviewEvaluator = async (req, res, next) => {
  const { id } = req.params
  try {
    const getReviews = await Review.findAll({
      where: { evaluatorId: id },
      include: [
        {
          model: User,
          as: 'evaluated',
          include: [{ model: Category, as: 'category' }],
        },
        {
          model: User,
          as: 'evaluator',
          include: [{ model: Category, as: 'category' }],
        },
      ],
    })
    res.send(getReviews)
  } catch (error) {
    next(error)
  }
}

const getReviewEvaluated = async (req, res, next) => {
  const { id } = req.params
  try {
    const getReviews = await Review.findAll({
      where: { evaluatedId: id },
      include: [
        {
          model: User,
          as: 'evaluated',
          include: [{ model: Category, as: 'category' }],
        },
        { model: User, as: 'evaluator' },
      ],
    })
    res.send(getReviews)
  } catch (error) {
    next(error)
  }
}

const reviewCheck = async (idIndicator, period, evaluatedId) => {
  const reviewChecker = await Review.findAll({
    where: {
      idIndicator,
      period,
      evaluatedId,
    },
  })

  return reviewChecker
}

const createReview = async (req, res, next) => {
  const { evaluatedId, evaluatorId, period, idIndicator, ...reviewFields } =
    req.body

  try {
    const check = await reviewCheck(idIndicator, period, evaluatedId)
    if (check[0]) {
      return res
        .status(403)
        .send('Este indicador ya fue evaluado en este período.')
    }

    const createReview = await Review.create({
      ...reviewFields,
      period,
      idIndicator,
      evaluatedId,
      evaluatorId,
    })
    if (!createReview) {
      return res
        .status(400)
        .send('No se pudo crear la devolución correctamente')
    }
    return res.status(201).send(createReview)
  } catch (error) {
    next(error)
  }
}

const deleteReview = async (req, res, next) => {
  const { id } = req.params

  if (!id) return res.status(400).send('Id vacío')

  try {
    const reviewDeleted = await Review.destroy({ where: { id } })
    reviewDeleted === 0
      ? res.status(404).send('No se encontro la devolución')
      : res.status(200).send('Se eliminó la devolución')
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getReviews,
  createReview,
  getReviewEvaluator,
  getReviewEvaluated,
  deleteReview,
}
