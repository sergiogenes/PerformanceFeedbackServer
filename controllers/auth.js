const { User } = require('../models')
const { generateToken } = require('../utils/token')

const userLogin = async (req, res, next) => {
  const { email, password } = req.body

  const sendPayload = user => {
    const payload = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      image: user.image,
      fileNumber: user.fileNumber,
      isAdmin: user.isAdmin,
      deactivated_at: user.deactivated_at,
      shift: user.shift,
      categoryId: user.categoryId,
    }
    const token = generateToken(payload)
    return res.cookie('token', token).send({ ...payload })
  }

  return await User.withCredentialsDoIfNone(
    email,
    password,
    sendPayload,
    () => {
      res.sendStatus(401)
      return next()
    }
  )
}

const userLogout = (req, res) => {
  res.clearCookie('token')
  res.status(200).send({})
}

const userMe = (req, res, next) => {
  res.send(req.user)
}

module.exports = { userLogin, userLogout, userMe }
