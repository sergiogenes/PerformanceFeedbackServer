const express = require('express')
const router = express.Router()

const {
  allIndicator,
  oneIndicator,
  createIndicator,
  modifyIndicator,
  deleteIndicator,
} = require('../controllers/indicator')
const { validateAuth } = require('../middleware/auth')

router.get('/', validateAuth, allIndicator)
router.get('/:id', validateAuth, oneIndicator)
router.post('/', validateAuth, createIndicator)
router.put('/:id', validateAuth, modifyIndicator)
router.delete('/:id', validateAuth, deleteIndicator)

module.exports = router
