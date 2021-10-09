const { InterviewSession } = require('../models/interviewSession')
const { Rotation } = require('../models/rotation')

exports.getInterviewSession = async (req, res) => {
    try {
        const iSessionId = req.params.id
        const interviewSession = new InterviewSession()
        const rotation = new Rotation()
        const interviewSessionRecord = await interviewSession.getInterviewSession(iSessionId)
        const rotationRecords = await rotation.getRotations(iSessionId)
        const data = {
            interviewSession: interviewSessionRecord.rows[0],
            rotations: rotationRecords.rows
        }
        res.status(200).json(data)
    } catch (err) {
        res.status(400).json({ errMsg: err })
    }
}

exports.updateInterviewSession = async (req, res) => {
    const { rotationNum } = req.body;
    try {
        const iSessionId = req.params.id
        const interviewSession = new InterviewSession();
        const updatedInterviewSession = await interviewSession.updateInterviewSession(iSessionId, rotationNum);
        res.status(200).json(updatedInterviewSession.rows)
    } catch (err) {
        res.status(400).json({ errMsg: err });
    }
}