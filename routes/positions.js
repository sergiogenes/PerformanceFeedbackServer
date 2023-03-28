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
router.post('/create', validatePermissions, createPosition)
router.put('/update', validatePermissions, updatePosition)
router.delete('/delete', validatePermissions, deletePosition)

module.exports = router
