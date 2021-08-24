const { JWT_SECRET_KEY } = require('../config/env/index')

const JWT = require('jsonwebtoken')

const createToken = (userId) => {
  return JWT.sign(
    {
      sub: userId,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 3),
    },
    JWT_SECRET_KEY,
  )
}

module.exports = {
  createToken,
}
