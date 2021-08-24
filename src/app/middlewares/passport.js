const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const LocalStrategy = require('passport-local').Strategy

const { JWT_SECRET_KEY } = require('../../config/env/index')
const User = require('../models/User')

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET_KEY,
}

passport.use(
  new JwtStrategy(options, async (jwt_payload, done) => {
    try {
      const user = await User.findOne({ _id: jwt_payload.sub })
      if (user) {
        return done(null, user)
      }
      return done(null, false)
    } catch (err) {
      return done(err, false)
    }
  }),
)

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false,
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email })
        if (!user) {
          return done(null, false)
        }
        const isValidPassword = await user.verifyPassword(password)
        if (!isValidPassword) {
          return done(null, false)
        }
        return done(null, user)
      } catch (err) {
        done(err, false)
      }
    },
  ),
)
