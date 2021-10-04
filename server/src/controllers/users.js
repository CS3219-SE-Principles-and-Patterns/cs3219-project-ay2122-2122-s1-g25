const pool = require('../db')
const bcrypt = require('bcryptjs');
exports.getUser = async (req, res) => {
    try {
        // const user = await pool.query("SELECT * FROM doctors d NATURAL JOIN clinics c INNER JOIN " +
        //     "(SELECT user_created_at, user_id, user_name, email FROM users) u ON d.doctor_id = u.user_id;")
        const userId = req.params.id
        const user = await pool.query("SELECT email, username, join_date first_name, last_name FROM Users WHERE user_id = $1", [userId])
        res.status(200).json(user.rows)
    } catch (err) {
        res.status(400).json({ errMsg: err })
    }
}

exports.createUser = async (req, res) => {
    const { email, password, username, firstName, lastName } = req.body
    encryptedPassword = await bcrypt.hash(password, 10);
    try {
        const createUser = await pool.query("INSERT INTO Users(join_date, email, hashed_password, username, first_name, last_name) VALUES($1, $2, $3, $4, $5, $6)", [new Date(), email, encryptedPassword, username, firstName, lastName])
        res.status(200).json(createUser.rows)
    } catch (err) {
        res.status(400).json({ errMsg: err })
    }
}

// exports.updateUser = async (req, res) => {
//     const { email, password, username, firstName, lastName } = req.body
//     encryptedPassword = await bcrypt.hash(password, 10);
//     try {
//         const createUser = await pool.query("INSERT INTO Users(email, hashed_password, username, first_name, last_name) VALUES($1, $2, $3, $4, $5)", [email, encryptedPassword, username, firstName, lastName])
//         res.status(200).json(createUser.rows)
//     } catch (err) {
//         res.status(400).json({ errMsg: err })
//     }
// }

exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id
        const deleteUser = await pool.query("DELETE FROM Users WHERE user_id = $1", [userId])
        res.status(200).json(deleteUser.rows)
    } catch (err) {
        res.status(400).json({ errMsg: err })
    }
}