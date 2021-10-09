const express = require('express')
const { getInterviewSession, updateInterviewSession } = require('../controllers/interviewSession')
const router = express.Router()


router.get('/:id', getInterviewSession)
router.put('/:id', updateInterviewSession)


module.exports = router