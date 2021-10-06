const pool = require('../db')
const { UserMatching } = require('../models/userMatching');

exports.getUserMatching = async (req, res) => {
    try {
        const userId = req.params.id;
        const userMatching = new UserMatching();
        const foundMatching = await userMatching.getUserMatching(userId);
        res.status(200).json(foundMatching.rows);
    } catch (err) {
        res.status(400).json({ errMsg: err });
    }
}

exports.createUserMatching = async (req, res) => {
    const { userId, difficulty } = req.body;
    try {
        const startedMatchingAt = new Date();
        const matchId = null;

        const userMatching = new UserMatching();
        const newUserMatching = await userMatching.createUserMatching(userId, startedMatchingAt, difficulty, matchId);
        res.status(200).json(newUserMatching.rows);
    } catch (err) {
        res.status(400).json({ errMsg: err });
    }
}

exports.updateUserMatching = async (req, res) => {
    const { matchId } = req.body;
    try {
        const userId = req.params.id;
        const userMatching = new UserMatching();
        const updatedUserMatching = await userMatching.updateUserMatching(userId, matchId);
        res.status(200).json(updatedUserMatching.rows)
    } catch (err) {
        res.status(400).json({ errMsg: err });
    }
}

exports.deleteUserMatching = async (req, res) => {
    try {
        const userId = req.params.id;
        const userMatching = new UserMatching();
        const deletedUserMatching = await userMatching.deleteUserMatching(userId);
        res.status(200).json(deletedUserMatching.rows)
    } catch (err) {
        res.status(400).json({ errMsg: err })
    }
}