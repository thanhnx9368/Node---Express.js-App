const express = require('express')
const router = express.Router()

const meController = require('../app/controllers/meController')

router.get('/stored/courses/trash', meController.trash)
router.get('/stored/courses', meController.index)

module.exports = router
