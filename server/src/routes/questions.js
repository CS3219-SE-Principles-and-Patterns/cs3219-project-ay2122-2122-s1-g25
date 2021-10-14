const express = require('express')
const { createQuestion, deleteQuestion } = require('../controllers/questions')
const router = express.Router()


router.post('/', createQuestion)
router.delete('/:id', deleteQuestion)

module.exports = router