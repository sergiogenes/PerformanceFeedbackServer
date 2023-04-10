const express = require('express')
const router = express.Router()
const {
  getPositions,
  createPosition,
  updatePosition,
  deletePosition,
} = require('../controllers/positions')
const { validateAuth, validateAdmin } = require('../middleware/auth')

router.get('/', validateAuth, getPositions)
router.post('/', validateAuth, validateAdmin, createPosition)
router.put('/:id', validateAuth, validateAdmin, updatePosition)
router.delete('/:id', validateAuth, validateAdmin, deletePosition)

module.exports = router
