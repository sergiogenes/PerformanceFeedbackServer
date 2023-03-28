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
const validateAuth = require('../middlewares/validate')

router.get('/', validateAuth, allUser)
router.get('/all', validateAuth, includeDeactivated) //include deactivated users
router.get('/:id', validateAuth, oneUser)
router.post('/', validateAuth, createUser)
router.put('/:id', validateAuth, modifyUser)
router.delete('/:id', validateAuth, deactivateUser)

module.exports = router
