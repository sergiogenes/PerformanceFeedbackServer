const express = require('express')
const router = express.Router()
const {
  allUser,
  oneUser,
  modifyUser,
  createUser,
  includeDeactivated,
  deactivateUser,
  allEmpleados,
  getAllUsersDesactivated,
  userMeEdit,
  getUserCountPositions,
} = require('../controllers/user')
const { validateAuth, validateAdmin } = require('../middleware/auth')

router.get('/', allUser)
router.get('/all', validateAuth, includeDeactivated)
router.get('/disabled', validateAuth, getAllUsersDesactivated)
router.get('/counts', validateAuth, getUserCountPositions)
router.get('/:id', validateAuth, oneUser)
router.get('/empleados/:id', validateAuth, allEmpleados)
router.post('/', validateAuth, validateAdmin, createUser)
router.put('/:id', validateAuth, validateAdmin, modifyUser)
router.put('/deactivate/:id', validateAuth, validateAdmin, deactivateUser)
router.put('/me/edit', validateAuth, userMeEdit)
module.exports = router
