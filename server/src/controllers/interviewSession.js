const { InterviewSession } = require('../models/interviewSession');
const { Rotation } = require('../models/rotation');

exports.getInterviewSession = async (req, res) => {
  try {
    console.log('IM HERE');
    const iSessionId = req.params.id;
    const interviewSession = new InterviewSession();
    const rotation = new Rotation();
    const interviewSessionRecord = await interviewSession.getInterviewSession(
      iSessionId
    );
    const rotationRecords = await rotation.getRotations(iSessionId);
    const data = {
      interviewSession: interviewSessionRecord.rows[0],
      rotations: rotationRecords.rows,
    };
    console.log(data);
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ errMsg: err });
  }
};

exports.getInterviewSessions = async (req, res) => {
  try {
    const userId = req.query.userId;
    const interviewSession = new InterviewSession();
    const interviewSessions = await interviewSession.getInterviewSessions(
      userId
    );
    res.status(200).json(interviewSessions.rows);
  } catch (err) {
    res.status(400).json({ errMsg: err });
  }
};

exports.updateInterviewRotation = async (req, res) => {
  const { rotationNum } = req.body;
  try {
    const iSessionId = req.params.id;
    const interviewSession = new InterviewSession();
    const updatedInterviewSession =
      await interviewSession.updateInterviewRotation(iSessionId, rotationNum);
    res.status(200).json(updatedInterviewSession.rows);
  } catch (err) {
    res.status(400).json({ errMsg: err });
  }
};

exports.updateInterviewCompletion = async (req, res) => {
  const { completion } = req.body;
  try {
    const iSessionId = req.params.id;
    const interviewSession = new InterviewSession();
    const updatedInterviewSession =
      await interviewSession.updateInterviewCompletion(iSessionId, completion);
    res.status(200).json(updatedInterviewSession.rows);
  } catch (err) {
    res.status(400).json({ errMsg: err });
  }
};
