const express = require('express')
const authRouter = require('./auth')
const positionsRouter = require('./positions')
const userRouter = require('./user')

const router = express.Router()

router.use('/auth', authRouter)
router.use('/users', userRouter)
router.use('/positions', positionsRouter)

module.exports = router
