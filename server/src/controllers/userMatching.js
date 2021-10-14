const { UserMatching } = require('../models/userMatching');
const { InterviewSession } = require('../models/interviewSession');
const { Rotation } = require('../models/rotation');
const pool = require('../db');
const { Questions } = require('../models/questions');

exports.getUserMatching = async (req, res) => {
    try {
        const userId = req.params.id;
        const userMatching = new UserMatching();
        const foundMatching = await userMatching.getUserMatching(userId);
        res.status(200).json(foundMatching.rows);
    } catch (err) {
        res.status(400).json({ errMsg: err });
    }
}

exports.createUserMatching = async (req, res) => {
    const { userId, difficulty } = req.body;
    try {
        const startedMatchingAt = new Date();
        const matchId = null;

        const userMatching = new UserMatching();
        const newUserMatching = await userMatching.createUserMatching(userId, startedMatchingAt, difficulty, matchId);
        res.status(200).json(newUserMatching.rows);
    } catch (err) {
        res.status(400).json({ errMsg: err });
    }
}

exports.updateUserMatching = async (req, res) => {
    const { matchId } = req.body;
    try {
        const userId = req.params.id;
        const userMatching = new UserMatching();
        const updatedUserMatching = await userMatching.updateUserMatching(userId, matchId);
        res.status(200).json(updatedUserMatching.rows)
    } catch (err) {
        res.status(400).json({ errMsg: err });
    }
}

exports.deleteUserMatching = async (req, res) => {
    try {
        const userId = req.params.id;
        const userMatching = new UserMatching();
        const deletedUserMatching = await userMatching.deleteUserMatching(userId);
        res.status(200).json(deletedUserMatching.rows)
    } catch (err) {
        res.status(400).json({ errMsg: err })
    }
}

exports.initialiseInterviewSession = async (user0, user1, difficulty) => {
    try {
        await pool.query('BEGIN')
        const interviewSession = new InterviewSession();
        const rotation = new Rotation();
        const question = new Questions();
        const newInterviewSession = await interviewSession.createInterviewSession(user0, user1, difficulty);
        const iSessionId = newInterviewSession.rows[0].isessionid
        const interviewQuestions = question.getRandTwoQuestions(difficulty)
        await rotation.createRotation(iSessionId, 0, interviewQuestions[0].questionId)
        await rotation.createRotation(iSessionId, 1, interviewQuestions[0].questionId)
        await pool.query('COMMIT')
        return iSessionId
    } catch (err) {
        await pool.query('ROLLBACK')
        throw err
    }
}