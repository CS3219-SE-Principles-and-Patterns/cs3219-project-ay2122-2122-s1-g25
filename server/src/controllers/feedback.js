const { Feedback } = require('../models/feedback')
exports.getFeedback = async (req, res) => {
    try {
        const iSessionId = req.params.id
        const userId = req.query.userId
        const feedback = new Feedback()
        const sessionFeedback = await feedback.getFeedback(iSessionId, userId)
        res.status(200).json(sessionFeedback.rows)
    } catch (err) {
        res.status(400).json({ errMsg: err })
    }
}

exports.getFeedbacks = async (req, res) => {
    try {
        const userId = req.query.userId
        const feedback = new Feedback()
        const feedbacks = await feedback.getFeedbacks(userId)
        res.status(200).json(feedbacks.rows)
    } catch (err) {
        res.status(400).json({ errMsg: err })
    }
}

exports.createFeedback = async (req, res) => {
    try {
        const { giverId, receiverId, iSessionId, rating, comment } = req.body

        const feedback = new Feedback()
        const newFeedback = await feedback.createFeedback(giverId, receiverId, iSessionId, rating, comment)
        res.status(200).json(newFeedback.rows)
    } catch (err) {
        res.status(400).json({ errMsg: err })
    }
}