const pool = require('../db')
class Questions {
    getRandTwoQuestions(diffuculty) {
        return pool.query("SELECT * FROM Questions WHERE difficulty = $1 ORDER BY random() limit 2", [diffuculty])
    }

    createQuestion(title, category, difficulty, description, input, output, suggestedAnswer) {
        return pool.query("INSERT INTO Questions(title, category, difficulty, description, input, output, suggestedAnswer) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *", [title, category, difficulty, description, input, output, suggestedAnswer]);
    }

    deleteQuestion(questionId) {
        return pool.query("DELETE FROM Questions WHERE questionId = $1 RETURNING *", [questionId])
    }
}

module.exports = { Questions };