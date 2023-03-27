const { verifyToken } = require('../utils/token')

function validateAuth(req, res, next) {
  const token = req.cookies.token
  if (!token) return res.status(401).send('Token inexistente')

  const { payload } = verifyToken(token)

  if (!payload) return res.status(401).send('Error verificación token')

  req.user = payload
  next()
}

module.exports = validateAuth
