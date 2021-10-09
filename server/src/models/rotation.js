const pool = require('../db')
class Rotation {
    createRotation(iSessionId, rotationNum, questionId) {
        return pool.query("INSERT INTO Rotations(iSessionId, rotationNum, questionId) VALUES($1, $2, $3) RETURNING *", [iSessionId, rotationNum, questionId])
    }

    updateRotation(iSessionId, rotationNum, attempt) {
        return pool.query("UPDATE Rotations SET attempt = $1 WHERE iSessionId = $2 AND rotationNum = $3", [attempt, iSessionId, rotationNum])
    }
}

module.exports = { Rotation };