const { User } = require('../models')
const { generateToken } = require('../utils/token')

const userLogin = async (req, res, next) => {
  const { email, password } = req.body

  try {
    await User.withEmailAndPasswordDoIfNone(
      email,
      password,
      user => {
        const payload = user.toJSON()
        const token = generateToken(payload)
        res.cookie('token', token).send(payload)
      },
      () => {
        res.sendStatus(401)
      }
    )
  } catch (error) {
    next(error)
  }
}

const userLogout = (_req, res) => {
  res.clearCookie('token')
  res.status(200).send({})
}

const userMe = (req, res) => {
  res.send(req.user)
}

module.exports = { userLogin, userLogout, userMe }
