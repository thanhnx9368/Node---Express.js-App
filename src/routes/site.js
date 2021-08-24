const express = require('express')
const router = express.Router()
const passport = require('passport')

//includes config middlware passport jwt
require('../app/middlewares/passport')

const SiteController = require('../app/controllers/SiteController')
const UserController = require('../app/controllers/UserController')

router.get('/', SiteController.index)
router.post('/sign-up', UserController.signUp)
router.post(
  '/sign-in',
  passport.authenticate('local', { session: false }),
  UserController.signIn,
)
router.post(
  '/verify',
  passport.authenticate('jwt', { session: false }),
  UserController.verify,
)

module.exports = router
