const express = require('express')
const { getCountries } = require('../controllers/country')
const { validateAuth } = require('../middleware/auth')

const router = express.Router()

router.get('/', validateAuth, getCountries)

module.exports = router
