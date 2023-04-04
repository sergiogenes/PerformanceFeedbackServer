const express = require('express')
const router = express.Router()

const {
  allCategory,
  oneCategory,
  createCategory,
  modifyCategory,
  deleteCategory,
} = require('../controllers/category')
const { validateAuth } = require('../middleware/auth')

router.get('/', validateAuth, allCategory)
router.get('/:id', validateAuth, oneCategory)
router.post('/', validateAuth, createCategory)
router.put('/:id', validateAuth, modifyCategory)
router.delete('/:id', validateAuth, deleteCategory)

module.exports = router
