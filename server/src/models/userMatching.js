const pool = require('../db');

class UserMatching {
    getUserMatching(userId) {
        return pool.query("SELECT * FROM UserMatching WHERE userId = $1", [userId])
    }

    getAllAvailableUserMatching(userId, difficulty) {
        return pool.query("SELECT * FROM UserMatching WHERE interviewSessionId is null AND userId != $1 AND difficulty = $2 ORDER BY startedMatchingAt ASC", [userId, difficulty])
    }

    createUserMatching(userId, startedMatchingAt, difficulty, interviewSessionId) {
        return pool.query("INSERT INTO UserMatching(userId, startedMatchingAt, difficulty, interviewSessionId) VALUES($1, $2, $3, $4) RETURNING *", [userId, startedMatchingAt, difficulty, interviewSessionId])
    }

    updateUserMatching(userId, iSessionId) {
        return pool.query("UPDATE UserMatching SET interviewSessionId = $2 WHERE userId = $1", [userId, iSessionId])
    }

    deleteUserMatching(userId) {
        return pool.query("DELETE FROM UserMatching WHERE userId = $1 RETURNING *", [userId])
    }
}

module.exports = { UserMatching };