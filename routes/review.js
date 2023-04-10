const {
  getReviews,
  createReview,
  getReviewEvaluator,
  deleteReview,
} = require('../controllers/review')

const router = require('express').Router()

router.get('/:id', getReviewEvaluator)
router.get('/', getReviews)
router.post('/', createReview)
router.delete('/:id', deleteReview)

module.exports = router
