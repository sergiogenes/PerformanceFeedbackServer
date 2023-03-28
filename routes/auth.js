const express = require('express')

const validateAuth = require('../middlewares/validate')
const { userLogin, userLogout, userMe } = require('../controllers/auth')

const router = express.Router()

router.post('/login', userLogin)

router.post('/logout', userLogout)

router.get('/me', validateAuth, userMe)

module.exports = router
