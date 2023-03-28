const User = require('../models/User')
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
      fileNumber: user.fileNumber,
      firstName: user.firstName,
      lastName: user.lastName,
      isAdmin: user.isAdmin,
    }

    token = generateToken(payload)
  } catch (error) {
    return res.send(console.error(error)).status(400)
  }


  return res.cookie('token', token).send(token)
}

module.exports = { userLogin }
