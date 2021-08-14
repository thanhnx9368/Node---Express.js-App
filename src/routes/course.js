const express = require('express')
const router = express.Router()

const CourseController = require('../app/controllers/CourseController')

router.put('/:id', CourseController.update)
router.delete('/:id', CourseController.delete)
router.get('/:id/edit', CourseController.edit)
router.get('/:slug', CourseController.show)

module.exports = router
