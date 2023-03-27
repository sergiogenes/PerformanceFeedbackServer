const User = require("../models");
const { generateToken } = require("../utils/token");

const userLogin = async (req, res, next) => {
  const { legajo, password } = req.body;
  let user, validation, payload, token;
  try {
    user = await User.findOne({ where: { email } });
    validation = await user.validatePassword(password);
    console.log(validation);
    if (!validation) return res.sendStatus(401);
    payload = {
      id: user.id,
      nombre: user.nombre,
      apellido: user.apellido,
      isAdmin: user.isAdmin,
    };
    token = generateToken(payload);
  } catch (error) {
    return res.send(error).status(400);
  }
  return res.cookie("token", token).send(payload);
};

module.exports = { userLogin };
