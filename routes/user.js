const express = require('express')
const router = express.Router()

const { allUser, oneUser, createUser } = require('../controllers/user')
const validateAuth = require('../middlewares/validate')

router.get('/', allUser)
router.get('/:id', oneUser)
router.post('/', createUser)

module.exports = router
