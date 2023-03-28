const express = require('express')
const router = express.Router()
const {
  allUser,
  oneUser,
  modifyUser,
  includeDeactivated,
  deactivateUser,
} = require('../controllers/user')
const validateAuth = require('../middlewares/validate')

router.get('/', validateAuth, allUser)
router.get('/all', validateAuth, includeDeactivated) //include deactivated users
router.get('/:id', validateAuth, oneUser)
router.put('/desactivate/:id', validateAuth, deactivateUser)
router.put('/:id', validateAuth, modifyUser)

module.exports = router
