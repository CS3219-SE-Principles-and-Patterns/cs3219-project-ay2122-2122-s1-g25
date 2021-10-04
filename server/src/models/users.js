const pool = require('../db')
class Users {
    // constructor() { }
    getUser(userId) {
        return pool.query("SELECT * FROM Users WHERE userId = $1", [userId])
    }

    createUser(userId, email, username, firstName, lastName) {
        return pool.query("INSERT INTO Users(userId, email, username, firstName, lastName) VALUES($1, $2, $3, $4, $5) RETURNING *", [userId, email, username, firstName, lastName])
    }

    deleteUser(userId) {
        return pool.query("DELETE FROM Users WHERE userId = $1 RETURNING *", [userId])
    }
}

module.exports = { Users };