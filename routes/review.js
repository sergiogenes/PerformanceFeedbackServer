const {
  getReviews,
  createReview,
  getReviewEvaluator,
  getReviewEvaluated,
  deleteReview,
} = require('../controllers/review')
const router = require('express').Router()
const { validateAuth } = require('../middleware/auth')

router.get('/:id', validateAuth, getReviewEvaluated)
router.get('/evaluator/:id', validateAuth, getReviewEvaluator)
router.get('/', validateAuth, getReviews)
router.post('/', validateAuth, createReview)
router.delete('/:id', validateAuth, deleteReview)

module.exports = router
