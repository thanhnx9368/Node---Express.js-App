const express = require('express')
const router = express.Router()

const CourseController = require('../app/controllers/CourseController')

router.patch('/:id/restore', CourseController.restore)
router.delete('/:id', CourseController.delete)
router.delete('/:id/force', CourseController.forceDestroy)
router.post('/handle-form-action', CourseController.handleFormAction)
router.get('/:id/edit', CourseController.edit)
router.put('/:id', CourseController.update)
router.get('/create', CourseController.create)
router.post('/store', CourseController.store)
router.get('/:slug', CourseController.show)

module.exports = router
