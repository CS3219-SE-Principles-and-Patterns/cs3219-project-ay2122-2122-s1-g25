const { Users } = require('../models/users')
exports.getUser = async (req, res) => {
    try {
        const userId = req.params.id
        const User = new Users()
        const user = await User.getUser(userId)
        res.status(200).json(user.rows)
    } catch (err) {
        res.status(400).json({ errMsg: err })
    }
    //     const userId = req.params.id
    //     const User = new Users()
    //     await User.getUser(userId)
    //         .then(res => {
    //             return res.status(200).json(res)
    //         })
    //         .catch(err => {
    //             return res.status(400).json(err)
    //         })
}

exports.createUser = async (req, res) => {
    const { userId, email, firstName, lastName } = req.body
    try {
        const User = new Users()
        const createUser = await User.createUser(userId, email, firstName, lastName)
        res.status(200).json(createUser.rows)
    } catch (err) {
        res.status(400).json({ errMsg: err })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id
        const User = new Users()
        const deleteUser = await User.deleteUser(userId)
        res.status(200).json(deleteUser.rows)
    } catch (err) {
        res.status(400).json({ errMsg: err })
    }
}