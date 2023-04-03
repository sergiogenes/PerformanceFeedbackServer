const express = require('express')
const router = express.Router()
const {
  createTeam,
  modifyTeam,
  deleteTeam,
  allTeam,
  oneTeam,
} = require('../controllers/team')
const validateAuth = require('../middlewares/validate')

router.get('/', validateAuth, allTeam)
router.get('/:id', validateAuth, oneTeam)
router.post('/', validateAuth, createTeam)
router.put('/:id', validateAuth, modifyTeam)
router.delete('/:id', validateAuth, deleteTeam)

module.exports = router
