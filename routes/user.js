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
} = require('../controllers/user')
const { validateAuth } = require('../middleware/auth')

router.get('/', validateAuth, allUser)
router.get('/all', validateAuth, includeDeactivated)
router.get('/:id', validateAuth, oneUser)
router.get('/empleados/:id', validateAuth, allEmpleados)
router.post('/', validateAuth, createUser)
router.put('/:id', validateAuth, modifyUser)
router.put('/deactivate/:id', validateAuth, deactivateUser)

module.exports = router
