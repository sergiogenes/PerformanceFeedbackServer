const express = require('express')
const authRouter = require('./auth')
const positionsRouter = require('./positions')
const userRouter = require('./user')
const teamRouter = require('./team')
const officesRouter = require('./office')
const categoryRouter = require('./category')
const indicatorRouter = require('./indicator')
const countriesRouter = require('./country')

const router = express.Router()

router.use('/auth', authRouter)
router.use('/users', userRouter)
router.use('/positions', positionsRouter)
router.use('/teams', teamRouter)
router.use('/offices', officesRouter)
router.use('/categories', categoryRouter)
router.use('/indicators', indicatorRouter)
router.use('/countries', countriesRouter)

module.exports = router
