const pool = require('../db')
class Questions {
    getRandTwoQuestions(difficulty) {
        return pool.query("SELECT questionId FROM Questions WHERE difficulty = $1 ORDER BY random() limit 2", [difficulty])
    }

    createQuestion(questions) {
        return pool.query("INSERT INTO Questions(title, category, difficulty, description, input, output, suggestedAnswer) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *", questions.title, questions.category, questions.difficulty, questions.description, questions.input, questions.output, questions.suggestedAnswer);
    }

    deleteQuestion(questionId) {
        return pool.query("DELETE FROM Questions WHERE questionId = $1 RETURNING *", [questionId])
    }
}

module.exports = { Questions };