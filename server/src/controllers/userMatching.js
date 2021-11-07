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
};

exports.getAllAvailableUserMatching = async (req, res) => {
  try {
    const userMatching = new UserMatching();
    const availableUserMatchings =
      await userMatching.getAllAvailableUserMatching();
    res.status(200).json(availableUserMatchings.rows);
  } catch (err) {
    res.status(400).json({ errMsg: err });
  }
};

exports.createUserMatching = async (req, res) => {
  const { userId, difficulty } = req.body;
  try {
    const startedMatchingAt = new Date();
    const interviewSessionId = null;
    const userMatching = new UserMatching();
    await userMatching.createUserMatching(
      userId,
      startedMatchingAt,
      difficulty,
      interviewSessionId
    );
    let tries = 0;
    let iSessionId = null;
    while (tries < 7) {
      const currentUserMatching = await userMatching.getUserMatching(userId);
      if (currentUserMatching.rows.length == 0) {
        break;
      } else if (currentUserMatching.rows[0].interviewsessionid) {
        iSessionId = currentUserMatching.rows[0].interviewsessionid;
        break;
      } else if (tries == 6) {
        const deletedUserMatching = await userMatching.deleteUserMatching(
          userId
        );
        return res.status(503).json(deletedUserMatching.rows);
      } else {
        const userMatch = new UserMatching();
        const availableUserMatchings =
          await userMatch.getAllAvailableUserMatching(userId, difficulty);
        if (availableUserMatchings.rows.length > 0) {
          let matchedId = availableUserMatchings.rows[0].userid;
          iSessionId = await exports.initialiseInterviewSession(
            userId,
            matchedId,
            difficulty
          );
          iSessionId = iSessionId.toString();
          await userMatch.updateUserMatching(userId, iSessionId);
          await userMatch.updateUserMatching(matchedId, iSessionId);
          break;
        }
        await sleep(5000);
        tries++;
      }
    }
    await userMatching.deleteUserMatching(userId);
    res.status(200).json({ iSessionId });
  } catch (err) {
    res.status(400).json({ errMsg: err });
  }
};

exports.deleteUserMatching = async (req, res) => {
  try {
    const userId = req.params.id;
    const userMatching = new UserMatching();
    const deletedUserMatching = await userMatching.deleteUserMatching(userId);
    res.status(200).json(deletedUserMatching.rows);
  } catch (err) {
    res.status(400).json({ errMsg: err });
  }
};

exports.initialiseInterviewSession = async (user0, user1, difficulty) => {
  try {
    await pool.query('BEGIN');
    const interviewSession = new InterviewSession();
    const rotation = new Rotation();
    const question = new Questions();
    const newInterviewSession = await interviewSession.createInterviewSession(
      user0,
      user1,
      difficulty
    );
    const iSessionId = newInterviewSession.rows[0].isessionid;
    const interviewQuestions = await question.getRandTwoQuestions(difficulty);
    await rotation.createRotation(
      iSessionId,
      0,
      interviewQuestions.rows[0].questionid
    );
    await rotation.createRotation(
      iSessionId,
      1,
      interviewQuestions.rows[1].questionid
    );
    await pool.query('COMMIT');
    return iSessionId;
  } catch (err) {
    await pool.query('ROLLBACK');
    throw err;
  }
};

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
