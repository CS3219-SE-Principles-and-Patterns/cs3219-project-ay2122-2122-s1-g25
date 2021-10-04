const pool = require('../db')
exports.getUser = async (req, res) => {
    try {
        // const user = await pool.query("SELECT * FROM doctors d NATURAL JOIN clinics c INNER JOIN " +
        //     "(SELECT user_created_at, user_id, user_name, email FROM users) u ON d.doctor_id = u.user_id;")
        const userId = req.params.id
        const user = await pool.query("SELECT * FROM Users WHERE userId = $1", [userId])
        res.status(200).json(user.rows)
    } catch (err) {
        res.status(400).json({ errMsg: err })
    }
}

exports.createUser = async (req, res) => {
    const { userId, email, username, firstName, lastName } = req.body
    try {
        const createUser = await pool.query("INSERT INTO Users(userId, email, username, firstName, lastName) VALUES($1, $2, $3, $4, $5) RETURNING *", [userId, email, username, firstName, lastName])
        res.status(200).json(createUser.rows)
    } catch (err) {
        res.status(400).json({ errMsg: err })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id
        const deleteUser = await pool.query("DELETE FROM Users WHERE userId = $1 RETURNING *", [userId])
        res.status(200).json(deleteUser.rows)
    } catch (err) {
        res.status(400).json({ errMsg: err })
    }
}