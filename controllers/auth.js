const { User } = require('../models')
const { generateToken } = require('../utils/token')

const userLogin = async (req, res, next) => {
  const { email, password } = req.body
  let user, validation, payload, token

  try {
    user = await User.findOne({ where: { email } })
    validation = await user.validatePassword(password)

    if (!validation) return res.status(401).send('Error de validación')

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
