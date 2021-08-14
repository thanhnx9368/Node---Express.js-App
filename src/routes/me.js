const express = require('express')
const router = express.Router()

const meController = require('../app/controllers/meController')

router.get('/stored/courses/:id/edit', meController.edit)
router.put('/stored/courses/:id', meController.update)
router.get('/stored/courses', meController.index)

module.exports = router
