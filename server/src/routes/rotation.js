const express = require('express')
const { updateRotation } = require('../controllers/rotation')
const router = express.Router()

router.put('/:id', updateRotation)

module.exports = router