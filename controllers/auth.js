const { User } = require('../models')
const { generateToken } = require('../utils/token')

const userLogin = (req, res) => {
  const { email, password } = req.body

  User.withCredentialsDoIfNone(
    email,
    password,
    user => {
      const payload = user.toJSON()
      const token = generateToken(payload)
      return res.cookie('token', token).send(payload)
    },
    () => {
      return res.sendStatus(401)
    }
  )
}

const userLogout = (_req, res) => {
  res.clearCookie('token')
  res.status(200).send({})
}

const userMe = (req, res) => {
  res.send(req.user)
}

module.exports = { userLogin, userLogout, userMe }
