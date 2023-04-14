const express = require('express')
const router = express.Router()

const {
  allCategory,
  oneCategory,
  createCategory,
  modifyCategory,
  deleteCategory,
} = require('../controllers/category')
const { validateAuth, validateAdmin } = require('../middleware/auth')

router.get('/', validateAuth, allCategory)
router.get('/:id', validateAuth, oneCategory)
router.post('/', validateAuth, validateAdmin, createCategory)
router.put('/:id', validateAuth, validateAdmin, modifyCategory)
router.delete('/:id', validateAuth, validateAdmin, deleteCategory)

module.exports = router
