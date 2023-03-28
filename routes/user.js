const express = require('express')
const router = express.Router()
const {
  allUser,
  oneUser,
  modifyUser,
  includeDesactivated,
  desactivateUser,
} = require('../controllers/user')
const validateAuth = require('../middlewares/validate')

router.get('/', validateAuth, allUser)
router.get('/all', validateAuth, includeDesactivated) //include desactivated users
router.get('/:id', validateAuth, oneUser)
router.put('/desactivate/:id', validateAuth, desactivateUser)
router.put('/:id', validateAuth, modifyUser)

module.exports = router
