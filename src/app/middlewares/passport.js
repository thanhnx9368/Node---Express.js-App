const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const LocalStrategy = require('passport-local').Strategy
const GoogleTokenStrategy = require('passport-google-token').Strategy
const FacebookTokenStrategy = require('passport-facebook-token')

const { JWT_SECRET_KEY, AUTH } = require('../../config/env/index')
const User = require('../models/User')

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET_KEY,
}

// passport verify jwt
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

// passport verify password before login
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

// passport verify google oauth2
passport.use(
  new GoogleTokenStrategy(
    {
      clientID: AUTH.GOOGLE.GOOGLE_CLIENT_ID,
      clientSecret: AUTH.GOOGLE.GOOGLE_CLIENT_SECRET,
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        const userEmail = profile.emails[0].value
        const userPhoto = profile.photos[0].value
        const user = await User.findOne({
          email: userEmail,
          authType: 'google',
          googleId: profile.id,
        })
        if (user) return done(null, user)

        const newUser = new User({
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          googleId: profile.id,
          authType: 'google',
          email: userEmail,
          image: userPhoto,
        })
        await newUser.save()
        done(null, newUser)
      } catch (err) {
        done(err, false)
      }
    },
  ),
)

passport.use(
  new FacebookTokenStrategy(
    {
      clientID: AUTH.FACEBOOK.FACEBOOK_CLIENT_ID,
      clientSecret: AUTH.FACEBOOK.FACEBOOK_CLIENT_SECRET,
      fbGraphVersion: 'v3.0',
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        const userEmail = profile.emails[0].value
        const userPhoto = profile.photos[0].value
        const user = await User.findOne({
          email: userEmail,
          authType: 'facebook',
          facebookId: profile.id,
        })
        if (user) return done(null, user)

        const newUser = new User({
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          facebookId: profile.id,
          authType: 'facebook',
          email: userEmail,
          image: userPhoto,
        })
        await newUser.save()
        done(null, newUser)
      } catch (err) {
        done(err, false)
      }
    },
  ),
)
