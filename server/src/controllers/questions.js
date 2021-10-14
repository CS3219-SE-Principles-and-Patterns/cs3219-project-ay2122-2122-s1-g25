const { Questions } = require('../models/questions')
exports.getRandTwoQuestions = async (req, res) => {
    try {
        const diffculty = req.params.difficulty
        const Question = new Questions()
        const question = await Question.getRandTwoQuestions(diffculty)
        res.status(200).json(question.rows)
    } catch (err) {
        res.status(400).json({ errMsg: err })
    }
}

exports.createQuestion = async (req, res) => {
    const { title, category, difficulty, description, input, output, suggestedAnswer } = req.body
    try {
        const Question = new Questions()
        const createQuestion = await Question.createQuestion(title, category, difficulty, description, input, output, suggestedAnswer)
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