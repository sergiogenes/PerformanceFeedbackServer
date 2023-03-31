const express = require('express')
const router = express.Router()
const {
  validatePermissions,
  getPositions,
  createPosition,
  updatePosition,
  deletePosition,
} = require('../controllers/positions')

router.get('/', getPositions)
router.post('/', validatePermissions, createPosition)
router.put('/:id', validatePermissions, updatePosition)
router.delete('/:id', validatePermissions, deletePosition)

module.exports = router
