const express = require('express')
const router = express.Router()

const CourseController = require('../app/controllers/CourseController')

router.patch('/:id/restore', CourseController.restore)
router.delete('/:id', CourseController.delete)
router.delete('/:id/force', CourseController.forceDestroy)
router.get('/:id/edit', CourseController.edit)
router.put('/:id', CourseController.update)
router.get('/:slug', CourseController.show)

module.exports = router
