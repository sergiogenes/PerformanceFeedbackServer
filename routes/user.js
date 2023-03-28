const express = require('express')
const router = express.Router()
const { allUser, oneUser, modifyUser } = require('../controllers/user')
const validateAuth = require('../middlewares/validate')

router.get('/', validateAuth, allUser)
router.get('/:id', validateAuth, oneUser)
router.put('/:id', validateAuth, modifyUser)

module.exports = router
