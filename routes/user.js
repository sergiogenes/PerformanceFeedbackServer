const express = require('express')
const router = express.Router()
const { allUser, oneUser } = require('../controllers/user')

router.get('/', allUser)
router.get('/:id', oneUser)


module.exports = router
