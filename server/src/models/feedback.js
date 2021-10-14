const pool = require('../db')
class Feedback {
    getFeedback(iSessionId, userId) {
        return pool.query("SELECT * FROM Feedbacks WHERE iSessionId = $1 AND receiverId = $2", [iSessionId, userId])
    }

    getFeedbacks(userId) {
        return pool.query("SELECT * FROM Feedbacks WHERE receiverId = $1", [userId])
    }

    createFeedback(giverId, receiverId, iSessionId, rating, comment) {
        return pool.query("INSERT INTO Feedbacks(giverId, receiverId, iSessionId, rating, comment) VALUES($1, $2, $3, $4, $5) RETURNING *", [giverId, receiverId, iSessionId, rating, comment])
    }
}

module.exports = { Feedback };