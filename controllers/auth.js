const { User } = require('../models')
const { generateToken } = require('../utils/token')

const userLogin = async (req, res, next) => {
  const { email, password } = req.body
  let user, validation, payload, token

  try {
    user = await User.findByEmail(email)
    if (!user) return res.sendStatus(401)

    validation = await user.hasPassword(password)

    if (!validation) return res.sendStatus(401)

    payload = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      image: user.image,
      fileNumber: user.fileNumber,
      isAdmin: user.isAdmin,
      deactivated_at: user.deactivated_at,
      shift: user.shift,
    }

    token = generateToken(payload)
  } catch (error) {
    return res.send(console.error(error)).status(400)
  }

  return res.cookie('token', token).send({ ...payload })
}

const userLogout = (req, res) => {
  res.clearCookie('token')
  res.status(200).send({})
}

const userMe = (req, res, next) => {
  res.send(req.user)
}

module.exports = { userLogin, userLogout, userMe }
