const express = require('express')
const router = express.Router()
const {
  allUser,
  oneUser,
  createUser,
  modifyUser,
} = require('../controllers/user')
const validateAuth = require('../middlewares/validate')

router.get('/', validateAuth, allUser)
router.get('/:id', validateAuth, oneUser)
router.post('/', validateAuth, createUser)
router.put('/:id', validateAuth, modifyUser)

module.exports = router
