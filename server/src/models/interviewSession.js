const pool = require('../db');

class InterviewSession {
    getInterviewSession(iSessionId) {
        return pool.query("SELECT * FROM InterviewSessions WHERE iSessionId = $1", [iSessionId])
    }

    getInterviewSessions(userId) {
        const query = "SELECT I.iSessionId, I.createdAt, I.difficulty, I.user0, I.user1, " +
        "U0.firstname user0Firstname, U0.lastname user0Lastname, " +
        "U1.firstname user1Firstname, U1.lastname user1Lastname " +
        "FROM InterviewSessions I " +
        "INNER JOIN Users U0 ON I.user0 = U0.userId " +
        "INNER JOIN Users U1 ON I.user1 = U1.userId " +
        "WHERE user0 = $1 OR user1 = $1 " +
        "ORDER BY I.createdAt DESC " +
        "LIMIT 10"
        return pool.query(query, [userId])
    }

    createInterviewSession(user0, user1, difficulty) {
        return pool.query("INSERT INTO InterviewSessions(user0, user1, rotationNum, complete, difficulty) VALUES($1, $2, 0, FALSE, $3) RETURNING *", [user0, user1, difficulty])
    }

    updateInterviewRotation(iSessionId, rotationNum) {
        return pool.query("UPDATE InterviewSessions SET rotationNum = $1 WHERE iSessionId = $2 RETURNING *", [rotationNum, iSessionId])
    }

    updateInterviewCompletion(iSessionId, completion) {
        return pool.query("UPDATE InterviewSessions SET complete = $1 WHERE iSessionId = $2 RETURNING *", [completion, iSessionId])
    }
}

module.exports = { InterviewSession };