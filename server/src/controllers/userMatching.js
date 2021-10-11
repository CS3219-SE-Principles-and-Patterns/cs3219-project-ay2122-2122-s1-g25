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

exports.getAllAvailableUserMatching = async (req, res) => {
    try {
        const userMatching = new UserMatching();
        const availableUserMatchings = await userMatching.getAllAvailableUserMatching();
        res.status(200).json(availableUserMatchings.rows);
    } catch (err) {
        res.status(400).json({ errMsg: err });
    }
}

exports.createUserMatching = async (req, res) => {
    // try to return interview session id instead
    // call another function if can find a match and maybe smaller userId create the interview session?
    const { userId, difficulty } = req.body;
    try {
        const startedMatchingAt = new Date();
        const matchId = null;

        const userMatching = new UserMatching();
        const newUserMatching = await userMatching.createUserMatching(userId, startedMatchingAt, difficulty, matchId);

        // loop through for 30 seconds to find a match
        let tries = 0;
        while (tries < 7) {
            const userMatching = new UserMatching();
            let currentUserMatching = await userMatching.getUserMatching(userId);
            if (JSON.parse(JSON.stringify(currentUserMatching.rows[0])).matchid) {
                // user has been chosen by another user
                res.status(200).json(currentUserMatching.rows);
                break;
            } else if (tries == 6) {
                // 30s timeout reached
                const deletedUserMatching = await userMatching.deleteUserMatching(userId);
                res.status(200).json(deletedUserMatching.rows)
                break;
            } else {
                // user searches for an available user
                const userMatch = new UserMatching();
                // gets all UserMatchings with matchId = null (excluding currentUserMatching)
                let availableUserMatchings = await userMatch.getAllAvailableUserMatching(userId, difficulty);
                if (availableUserMatchings.rows.length > 0) {
                    // get match with the first (oldest) entry
                    let matchedId = JSON.parse(JSON.stringify(availableUserMatchings.rows[0])).userid;
                    currentUserMatching = await userMatch.updateUserMatching(userId, matchedId);
                    availableUserMatchings = await userMatch.updateUserMatching(matchedId, userId);

                    let newInterviewSession = await initialiseInterviewSession(userId, matchedId, difficulty);

                    res.status(200).json(currentUserMatching.rows);
                    break;
                }
                await sleep(5000);
                tries++;
            }
        }
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

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}