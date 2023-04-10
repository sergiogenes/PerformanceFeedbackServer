const express = require('express')
const {
  getOffices,
  createOffice,
  updateOffice,
  deleteOffice,
} = require('../controllers/office')
const router = express.Router()
const { validateAuth, validateAdmin } = require('../middleware/auth')

router.get('/', validateAuth, getOffices)
router.post('/', validateAuth, validateAdmin, createOffice)
router.put('/:id', validateAuth, validateAdmin, updateOffice)
router.delete('/:id', validateAuth, validateAdmin, deleteOffice)

module.exports = router
