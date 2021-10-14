const pool = require('../db')
class Questions {
    getRandTwoQuestions(difficulty) {
        return pool.query("SELECT questionId FROM Questions WHERE difficulty = $1 ORDER BY random() limit 2", [difficulty])
    }

    createQuestion(questions) {
        return pool.query("INSERT INTO Questions(title, category, difficulty, description, input, output, suggestedAnswer) VALUES($1, $2, $3, $4, $5, $6, $7),($8, $9, $10, $11, $12, $13, $14),($15, $16, $17, $18, $19, $20, $21),($22, $23, $24, $25, $26, $27, $28),($29, $30, $31, $32, $33, $34, $35) RETURNING *", [questions[0].title, questions[0].category, questions[0].difficulty, questions[0].description, questions[0].input, questions[0].output, questions[0].suggestedAnswer, questions[1].title, questions[1].category, questions[1].difficulty, questions[1].description, questions[1].input, questions[1].output, questions[1].suggestedAnswer, questions[2].title, questions[2].category, questions[2].difficulty, questions[2].description, questions[2].input, questions[2].output, questions[2].suggestedAnswer, questions[3].title, questions[3].category, questions[3].difficulty, questions[3].description, questions[3].input, questions[3].output, questions[3].suggestedAnswer, questions[4].title, questions[4].category, questions[4].difficulty, questions[4].description, questions[4].input, questions[4].output, questions[4].suggestedAnswer]);
    }

    deleteQuestion(questionId) {
        return pool.query("DELETE FROM Questions WHERE questionId = $1 RETURNING *", [questionId])
    }
}

module.exports = { Questions };