const express = require('express')
const authRouter = require('./auth')
const positionsRouter = require('./positions')
const userRouter = require('./user')
const teamRouter = require('./team')
const categoryRouter = require('./category')

const router = express.Router()

router.use('/auth', authRouter)
router.use('/users', userRouter)
router.use('/positions', positionsRouter)
router.use('/teams', teamRouter)
router.use('/categories', categoryRouter)

module.exports = router
