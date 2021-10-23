const express = require('express')
const { getInterviewSession, getInterviewSessions, updateInterviewRotation, updateInterviewCompletion } = require('../controllers/interviewSession')
const router = express.Router()


router.get('/:id', getInterviewSession)
router.get('/', getInterviewSessions)
router.put('/updateRotation/:id', updateInterviewRotation)
router.put('/updateCompletion/:id', updateInterviewCompletion)

module.exports = router