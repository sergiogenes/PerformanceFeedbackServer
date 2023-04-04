const express = require('express')
const {
  getOffices,
  createOffice,
  updateOffice,
  deleteOffice,
} = require('../controllers/office')
const router = express.Router()

router.get('/', getOffices)
router.post('/', createOffice)
router.put('/:id', updateOffice)
router.delete('/:id', deleteOffice)

module.exports = router
