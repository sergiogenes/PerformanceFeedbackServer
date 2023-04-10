const express = require('express')
const router = express.Router()

const {
  createTeam,
  modifyTeam,
  deleteTeam,
  allTeam,
  oneTeam,
} = require('../controllers/team')
const { validateAuth, validateAdmin } = require('../middleware/auth')

router.get('/', validateAuth, allTeam)
router.get('/:id', validateAuth, oneTeam)
router.post('/', validateAuth, validateAdmin, createTeam)
router.put('/:id', validateAuth, validateAdmin, modifyTeam)
router.delete('/:id', validateAuth, validateAdmin, deleteTeam)

module.exports = router
