const UserMatching = require('../models/userMatching');

exports.getAllUserMatchings = async (req, res) => {
    // get all UserMatching objects in the model
    res.send(UserMatching.Matchings);
}

exports.createUserMatching = async (req, res) => {
    // create a new UserMatching object in the model

    const matchTime = Date.now();
    const newUserMatching = {
        userId: req.body.userId,
        startedMatchingAt: matchTime,
        difficulty: req.body.difficulty,
        matchId: null
    }
    UserMatching.Matchings.push(newUserMatching);
    res.send(newUserMatching);
}