const pool = require('../db')
class Rotation {
    getRotations(iSessionId) {
        const query = "SELECT * " + 
        "FROM Rotations R NATURAL JOIN Questions Q " + 
        "WHERE R.iSessionId = $1 " + 
        "ORDER BY R.rotationNum"
        return pool.query(query, [iSessionId])
    }

    createRotation(iSessionId, rotationNum, questionId) {
        return pool.query("INSERT INTO Rotations(iSessionId, rotationNum, questionId) VALUES($1, $2, $3) RETURNING *", [iSessionId, rotationNum, questionId])
    }

    updateRotation(iSessionId, rotationNum, attempt) {
        return pool.query("UPDATE Rotations SET attempt = $1 WHERE iSessionId = $2 AND rotationNum = $3 RETURNING *", [attempt, iSessionId, rotationNum])
    }
}

module.exports = { Rotation };