const express = require('express')
const { getFeedback, getFeedbacks, createFeedback } = require('../controllers/feedback')
const router = express.Router()

router.get('/:id', getFeedback)
router.get('/', getFeedbacks)
router.post('/', createFeedback)

module.exports = router