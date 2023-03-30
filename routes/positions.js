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
router.put('/', validatePermissions, updatePosition)
router.delete('/', validatePermissions, deletePosition)

module.exports = router
