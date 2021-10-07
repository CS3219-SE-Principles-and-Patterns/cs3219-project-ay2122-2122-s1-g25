const pool = require('../db')
class Users {
    getUser(userId) {
        return pool.query("SELECT * FROM Users WHERE userId = $1", [userId])
    }

    createUser(userId, email, firstName, lastName) {
        return pool.query("INSERT INTO Users(userId, email, firstName, lastName) VALUES($1, $2, $3, $4) RETURNING *", [userId, email, firstName, lastName])
    }

    deleteUser(userId) {
        return pool.query("DELETE FROM Users WHERE userId = $1 RETURNING *", [userId])
    }
}

module.exports = { Users };