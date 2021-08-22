const express = require('express')
const router = express.Router()

const UserController = require('../app/controllers/UserController')

router.get('/trash', UserController.trash)
router.patch('/:userId/restore', UserController.restore)
router.patch('/:userId/force-delete', UserController.forceDelete)
router.put('/:userId', UserController.update)
router.delete('/:userId', UserController.delete)

router.post('/:userId/courses', UserController.createUserCourse)
router.get('/:userId/courses', UserController.getUserCourse)

router.post('/', UserController.create)
router.get('/', UserController.index)

module.exports = router
