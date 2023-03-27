const express = require('express')
const router = express.Router()
const { allUser, oneUser } = require('../controllers/user')
const validateAuth = require('../middlewares/validate')

router.get('/', allUser)
router.get('/:id', oneUser)

module.exports = router
