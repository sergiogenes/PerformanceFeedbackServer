const express = require('express')
const router = express.Router()
const {
  allUser,
  oneUser,
  modifyUser,
  createUser,
  includeDeactivated,
  deactivateUser,
} = require('../controllers/user')
const { validateAuth } = require('../middleware/auth')

router.get('/', validateAuth, allUser)
router.get('/all', validateAuth, includeDeactivated)
router.get('/:id', validateAuth, oneUser)
router.post('/', validateAuth, createUser)
router.put('/:id', validateAuth, modifyUser)
router.put('/deactivate/:id', validateAuth, deactivateUser)

module.exports = router
