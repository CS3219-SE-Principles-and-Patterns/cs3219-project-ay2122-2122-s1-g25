const pool = require('../db');

class InterviewSession {
    getInterviewSession(iSessionId) {
        return pool.query("SELECT * FROM InterviewSessions WHERE iSessionId = $1", [iSessionId])
    }

    getInterviewSessions(userId) {
        return pool.query("SELECT * FROM InterviewSessions WHERE user0 = $1 OR user1 = $1", [userId])
    }

    createInterviewSession(user0, user1, difficulty) {
        return pool.query("INSERT INTO InterviewSessions(user0, user1, rotationNum, complete, difficulty) VALUES($1, $2, 0, FALSE, $3) RETURNING *", [user0, user1, difficulty])
    }

    updateInterviewSession(iSessionId, rotationNum) {
        return pool.query("UPDATE InterviewSessions SET rotationNum = $1 WHERE iSessionId = $2 RETURNING *", [rotationNum, iSessionId])
    }
}

module.exports = { InterviewSession };