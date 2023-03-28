const express = require('express')
const authRouter = require('./auth')
const positionsRouter = require('./positions')

const router = express.Router()

router.use('/auth', authRouter)
router.use('/positions', positionsRouter)

module.exports = router
