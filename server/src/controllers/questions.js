const { Questions } = require('../models/questions')

exports.createQuestion = async (req, res) => {
    const question = req.body
    try {
        const Question = new Questions()
        const createQuestion = await Question.createQuestion(question)
        res.status(200).json(createQuestion.rows)
    } catch (err) {
        res.status(400).json({ errMsg: err })
    }
}

exports.deleteQuestion = async (req, res) => {
    try {
        const questionId = req.params.id
        const Question = new Questions()
        const deleteQuestion = await Question.deleteQuestion(questionId)
        res.status(200).json(deleteQuestion.rows)
    } catch (err) {
        res.status(400).json({ errMsg: err })
    }
}