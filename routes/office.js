const express = require('express')
const {
  getOffices,
  createOffice,
  updateOffice,
  deleteOffice,
} = require('../controllers/office')
const router = express.Router()
const { validateAuth } = require('../middleware/auth')

router.get('/', validateAuth, getOffices)
router.post('/', validateAuth, createOffice)
router.put('/:id', validateAuth, updateOffice)
router.delete('/:id', validateAuth, deleteOffice)

module.exports = router
