const jwt = require('jsonwebtoken')

const secret = require('./dotenv')

const generateToken = payload => jwt.sign(payload, secret, { expiresIn: '8h' })

const verifyToken = token => jwt.verify(token, secret)

module.exports = { generateToken, verifyToken }
