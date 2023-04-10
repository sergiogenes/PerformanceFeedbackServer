const express = require('express')
const router = express.Router()

const {
  allIndicator,
  oneIndicator,
  allIndicatorCategory,
  createIndicator,
  modifyIndicator,
  deleteIndicator,
} = require('../controllers/indicator')
const { validateAuth, validateAdmin } = require('../middleware/auth')

router.get('/', validateAuth, allIndicator)
router.get('/:id', validateAuth, oneIndicator)
router.get('/category/:id', validateAuth, allIndicatorCategory)
router.post('/', validateAuth, validateAdmin, createIndicator)
router.put('/:id', validateAuth, validateAdmin, modifyIndicator)
router.delete('/:id', validateAuth, validateAdmin, deleteIndicator)

module.exports = router
