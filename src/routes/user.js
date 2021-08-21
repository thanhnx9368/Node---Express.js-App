const express = require('express')
const router = express.Router()

const UserController = require('../app/controllers/UserController')

router.get('/trash', UserController.trash)
router.patch('/restore', UserController.restore)
router.patch('/force-delete', UserController.forceDelete)
router.post('/', UserController.create)
router.put('/', UserController.update)
router.delete('/', UserController.delete)
router.get('/', UserController.index)

module.exports = router
