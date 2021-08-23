const express = require('express')
const router = express.Router()
const {
  validateParam,
  validateBody,
  schemas,
} = require('../app/middlewares/routerMiddleware')

const UserController = require('../app/controllers/UserController')

router.get('/trash', UserController.trash)
router.patch(
  '/:userId/restore',
  validateParam(schemas.idSchema, 'userId'),
  UserController.restore,
)
router.patch(
  '/:userId/force-delete',
  validateParam(schemas.idSchema, 'userId'),
  UserController.forceDelete,
)
router.put(
  '/:userId',
  validateBody(schemas.editUserSchema),
  UserController.update,
)
router.delete(
  '/:userId',
  validateParam(schemas.idSchema, 'userId'),
  UserController.delete,
)

router.post(
  '/:userId/courses',
  validateBody(schemas.courseSchema),
  UserController.createUserCourse,
)
router.get('/:userId/courses', UserController.getUserCourse)

router.post('/', validateBody(schemas.userSchema), UserController.create)
router.get('/', UserController.index)

module.exports = router
