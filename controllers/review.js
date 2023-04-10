const { Review, User } = require('../models')

const getReviews = async (req, res) => {
  const reviews = await Review.findAll()
  res.send(reviews)
}

const getReviewEvaluator = async (req, res) => {
  const { id } = req.params
  const getReviews = await Review.findAll({
    where: { evaluatorId: id },
    include: [
      { model: User, as: 'evaluated' },
      { model: User, as: 'evaluator' },
    ],
  })

  res.send(getReviews)
}

const getReviewEvaluated = async (req, res) => {
  const { id } = req.params
  const getReviews = await Review.findAll({
    where: { evaluatedId: id },
    include: [
      { model: User, as: 'evaluated' },
      { model: User, as: 'evaluator' },
    ],
  })

  res.send(getReviews)
}

const createReview = async (req, res) => {
  const { evaluatedId, evaluatorId, ...reviewFields } = req.body
  try {
    const createReview = await Review.create({
      ...reviewFields,
      evaluatedId,
      evaluatorId,
    })
    if (!createReview) {
      return res
        .status(400)
        .send({ Error: 'No se pudo crear la devolución correctamente' })
    }
    return res.status(201).send(createReview)
  } catch (error) {
    res.send({ Error: error })
  }
}

const deleteReview = async (req, res) => {
  const { id } = req.params

  if (!id) return res.status(400).json({ Error: 'Id vacío' })

  try {
    const reviewDeleted = await Review.destroy({ where: { id } })
    reviewDeleted === 0
      ? res.status(404).json({ Error: 'No se encontro la devolución' })
      : res.status(200).send('Se eliminó la devolución')
  } catch (error) {
    return res.send(console.error(error)).status(400)
  }
}

module.exports = {
  getReviews,
  createReview,
  getReviewEvaluator,
  getReviewEvaluated,
  deleteReview,
}
