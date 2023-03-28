const express = require('express')

const { userLogin, userLogout } = require('../controllers/auth')

const router = express.Router()

router.post('/login', userLogin)

router.post('/logout', userLogout)

module.exports = router
