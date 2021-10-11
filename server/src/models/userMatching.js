const pool = require('../db');

class UserMatching {
    getUserMatching(userId) {
        return pool.query("SELECT * FROM UserMatching WHERE userId = $1", [userId])
    }

    getAllAvailableUserMatching(userId) {
        return pool.query("SELECT * FROM UserMatching WHERE matchId is null AND userId != $1", [userId])
    }

    createUserMatching(userId, startedMatchingAt, difficulty, matchId) {
        return pool.query("INSERT INTO UserMatching(userId, startedMatchingAt, difficulty, matchId) VALUES($1, $2, $3, $4) RETURNING *", [userId, startedMatchingAt, difficulty, matchId])
    }

    updateUserMatching(userId, matchId) {
        return pool.query("UPDATE UserMatching SET matchId = $1 WHERE userId = $2", [matchId, userId])
    }

    deleteUserMatching(userId) {
        return pool.query("DELETE FROM UserMatching WHERE userId = $1 RETURNING *", [userId])
    }
}

module.exports = { UserMatching };