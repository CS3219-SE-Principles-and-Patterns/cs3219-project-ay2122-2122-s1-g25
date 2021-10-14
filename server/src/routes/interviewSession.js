const express = require('express')
const { getInterviewSession, getInterviewSessions, updateInterviewSession } = require('../controllers/interviewSession')
const router = express.Router()


router.get('/:id', getInterviewSession)
router.get('/', getInterviewSessions)
router.put('/:id', updateInterviewSession)


module.exports = router